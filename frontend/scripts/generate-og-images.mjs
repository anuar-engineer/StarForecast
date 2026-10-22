// Genera las imágenes de los artículos, landings y páginas principales en
// frontend/public/og/ con el sistema de diseño del sitio (fondo noche, acento
// esmeralda, Space Grotesk). Se ejecuta antes de cada build (`prebuild`) y al
// arrancar el servidor de desarrollo (`prestart`).
//
// Por cada entrada se generan dos imágenes:
//   - og/<ruta>.jpg          1200x630 con el título: Open Graph, Twitter y
//                            JSON-LD (JPEG: no todas las redes aceptan WebP).
//   - og/<ruta>-cover.webp   1200x630 sin título y og/<ruta>-thumb.webp (640px):
//                            portada que se muestra dentro del sitio.
// El gráfico de fondo depende de la categoría y varía con el slug, para que dos
// artículos de la misma categoría no tengan la misma portada.
//
// Los textos salen de blog-data.ts y landing-data.ts (Node los importa
// directamente gracias al type stripping). Una caché por hash evita regenerar
// las imágenes que no han cambiado.
//
// Uso manual: `npm run og` desde frontend/.

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FRONTEND = resolve(__dirname, '..');
const OUT_DIR = resolve(FRONTEND, 'public/og');
const MANIFEST = resolve(OUT_DIR, '.manifest.json');
const require = createRequire(import.meta.url);

/** Cambia este valor para forzar la regeneración de todas las imágenes. */
const DESIGN_VERSION = '3';
const W = 1200;
const H = 630;

const C = {
  night950: '#05080f',
  night900: '#090e1a',
  accent300: '#6ee7b7',
  accent400: '#34d399',
  cyan400: '#22d3ee',
  slate300: '#cbd5e1',
  slate400: '#94a3b8',
  slate500: '#64748b',
};

// ------------------------------------------------------------------ datos

const { BLOG_POSTS } = await import(
  pathToFileURL(resolve(FRONTEND, 'src/app/features/marketing/blog/blog-data.ts')).href
);
const { LANDING_PAGES } = await import(
  pathToFileURL(resolve(FRONTEND, 'src/app/features/marketing/landing/landing-data.ts')).href
);

/** Motivo gráfico de fondo según la categoría del artículo. */
const MOTIF_BY_CATEGORY = {
  Guías: 'forecast',
  Operaciones: 'sawtooth',
  Estrategia: 'flows',
  Producto: 'intermittent',
};

const PAGES = [
  { file: 'home', eyebrow: 'Previsión de stock para pymes', title: 'Predice tu stock antes de quedarte sin él', motif: 'forecast' },
  { file: 'features', eyebrow: 'Funcionalidades', title: 'De la previsión al pedido de compra', motif: 'sawtooth' },
  { file: 'pricing', eyebrow: 'Precios', title: 'Precios claros, sin permanencia. Desde 29 €/mes', motif: 'forecast' },
  { file: 'blog', eyebrow: 'Blog', title: 'Ideas sobre stock, demanda y forecasting', motif: 'flows' },
  { file: 'about', eyebrow: 'Sobre nosotros', title: 'Predecir el stock no debería ser un lujo', motif: 'flows' },
  { file: 'contact', eyebrow: 'Contacto', title: 'Hablemos de tu inventario', motif: 'intermittent' },
];

const entries = [
  ...PAGES.map((p) => ({ ...p, seed: p.file })),
  ...LANDING_PAGES.map((l) => ({
    file: l.slug,
    eyebrow: l.eyebrow,
    title: l.h1,
    motif: 'forecast',
    seed: l.slug,
  })),
  ...BLOG_POSTS.map((p) => ({
    file: `blog/${p.slug}`,
    eyebrow: p.category,
    title: p.title,
    motif: MOTIF_BY_CATEGORY[p.category] ?? 'forecast',
    seed: p.slug,
  })),
];

// ------------------------------------------------------------------ utilidades

/** Generador pseudoaleatorio determinista (mulberry32) a partir de un texto. */
function rng(seed) {
  let a = createHash('sha1').update(seed).digest().readUInt32LE(0);
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const svgUri = (svg) => `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;

/** Curva suave (Catmull-Rom → Bézier) que pasa por los puntos. */
function smooth(points) {
  let d = `M${points[0][0].toFixed(1)},${points[0][1].toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}

// ------------------------------------------------------------------ motivos
// Cada motivo devuelve un SVG de W x h que ocupa la parte inferior de la imagen.

/** Histórico + previsión con banda de confianza. */
function motifForecast(rand, h) {
  const n = 22;
  const today = 14;
  const base = h * (0.45 + rand() * 0.15);
  const trend = (rand() - 0.35) * 6;
  const amp = h * (0.08 + rand() * 0.08);
  const period = 5 + Math.floor(rand() * 4);
  const phase = rand() * Math.PI * 2;
  const step = W / (n - 1);
  const y = (i) => base - trend * i - amp * Math.sin((i / period) * Math.PI * 2 + phase);
  const hist = Array.from({ length: today + 1 }, (_, i) => [i * step, y(i) + (rand() - 0.5) * amp * 0.9]);
  const fut = Array.from({ length: n - today }, (_, k) => [(today + k) * step, y(today + k)]);
  fut[0] = hist[today];
  const upper = fut.map(([x, v], k) => [x, v - k * h * 0.018]);
  const lower = fut.map(([x, v], k) => [x, v + k * h * 0.018]).reverse();
  const tx = today * step;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${h}" viewBox="0 0 ${W} ${h}">
    <defs>
      <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.accent400}" stop-opacity="0.22"/><stop offset="1" stop-color="${C.accent400}" stop-opacity="0"/></linearGradient>
    </defs>
    <path d="${smooth(hist)} L${tx},${h} L0,${h} Z" fill="url(#fill)"/>
    <path d="${smooth(upper)} L${smooth(lower).slice(1)} Z" fill="${C.cyan400}" fill-opacity="0.12"/>
    <path d="${smooth(hist)}" fill="none" stroke="${C.accent400}" stroke-width="5" stroke-linecap="round"/>
    <path d="${smooth(fut)}" fill="none" stroke="${C.cyan400}" stroke-width="5" stroke-linecap="round" stroke-dasharray="4 14"/>
    <line x1="${tx}" y1="0" x2="${tx}" y2="${h}" stroke="${C.slate500}" stroke-opacity="0.5" stroke-width="2" stroke-dasharray="6 8"/>
    <circle cx="${tx}" cy="${hist[today][1]}" r="11" fill="${C.night950}" stroke="${C.accent400}" stroke-width="5"/>
  </svg>`;
}

/** Nivel de stock en diente de sierra con punto de pedido. */
function motifSawtooth(rand, h) {
  const reorder = h * (0.62 + rand() * 0.08);
  const top = h * (0.12 + rand() * 0.1);
  const cycles = 3 + Math.floor(rand() * 3);
  const width = W / cycles;
  const line = [];
  let x = 0;
  for (let c = 0; c < cycles; c++) {
    const start = top + rand() * h * 0.12;
    const end = Math.min(h * 0.92, reorder + rand() * h * 0.16);
    const w = width * (0.85 + rand() * 0.3);
    line.push([x, start]);
    const mid = [x + w * 0.5, start + (end - start) * (0.45 + rand() * 0.15)];
    line.push(mid);
    line.push([x + w, end]);
    x += w;
  }
  const bars = Array.from({ length: 30 }, (_, i) => {
    const bh = h * (0.05 + rand() * 0.16);
    return `<rect x="${(i * W) / 30 + 8}" y="${h - bh}" width="${W / 30 - 16}" height="${bh}" rx="4" fill="${C.slate400}" fill-opacity="0.12"/>`;
  }).join('');
  const d = line.map(([px, py], i) => `${i ? 'L' : 'M'}${px.toFixed(1)},${py.toFixed(1)}`).join(' ');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${h}" viewBox="0 0 ${W} ${h}">
    <defs>
      <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.accent400}" stop-opacity="0.2"/><stop offset="1" stop-color="${C.accent400}" stop-opacity="0"/></linearGradient>
    </defs>
    ${bars}
    <path d="${d} L${x.toFixed(1)},${h} L0,${h} Z" fill="url(#fill)"/>
    <path d="${d}" fill="none" stroke="${C.accent400}" stroke-width="5" stroke-linejoin="round"/>
    <line x1="0" y1="${reorder}" x2="${W}" y2="${reorder}" stroke="${C.cyan400}" stroke-width="3" stroke-dasharray="14 12" stroke-opacity="0.8"/>
  </svg>`;
}

/** Varias series que convergen: la cadena de suministro alineada. */
function motifFlows(rand, h) {
  const colors = [C.accent400, C.cyan400, C.slate400];
  const meet = h * (0.35 + rand() * 0.2);
  const paths = colors
    .map((color, s) => {
      const start = h * (0.15 + s * 0.3 + (rand() - 0.5) * 0.1);
      const wobble = h * (0.06 + rand() * 0.06);
      const points = Array.from({ length: 9 }, (_, i) => {
        const t = i / 8;
        const yv = start + (meet - start) * Math.min(1, t * 1.4) + Math.sin(t * Math.PI * (2 + s) + rand()) * wobble * (1 - t);
        return [t * W, yv];
      });
      const opacity = s === 2 ? 0.45 : 0.9;
      return `<path d="${smooth(points)}" fill="none" stroke="${color}" stroke-opacity="${opacity}" stroke-width="5" stroke-linecap="round"/>`;
    })
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${h}" viewBox="0 0 ${W} ${h}">
    ${paths}
    <circle cx="${W / 1.4}" cy="${meet}" r="12" fill="${C.night950}" stroke="${C.accent400}" stroke-width="5"/>
  </svg>`;
}

/** Demanda irregular (barras esporádicas) con su tasa suavizada. */
function motifIntermittent(rand, h) {
  const n = 36;
  const bw = W / n;
  let rate = h * 0.15;
  const smoothPts = [];
  const bars = Array.from({ length: n }, (_, i) => {
    const hit = rand() < 0.35;
    const bh = hit ? h * (0.25 + rand() * 0.55) : 0;
    rate = rate * 0.85 + bh * 0.15;
    smoothPts.push([i * bw + bw / 2, h - 12 - rate * 1.4]);
    return hit
      ? `<rect x="${i * bw + 6}" y="${h - bh}" width="${bw - 12}" height="${bh}" rx="5" fill="${C.accent400}" fill-opacity="${0.35 + rand() * 0.35}"/>`
      : `<rect x="${i * bw + 6}" y="${h - 6}" width="${bw - 12}" height="6" rx="3" fill="${C.slate500}" fill-opacity="0.35"/>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${h}" viewBox="0 0 ${W} ${h}">
    ${bars}
    <path d="${smooth(smoothPts)}" fill="none" stroke="${C.cyan400}" stroke-width="5" stroke-linecap="round"/>
  </svg>`;
}

const MOTIFS = {
  forecast: motifForecast,
  sawtooth: motifSawtooth,
  flows: motifFlows,
  intermittent: motifIntermittent,
};

// ------------------------------------------------------------------ composición

const h = (type, style, children) => ({ type, props: { style, children } });

/** Logo de la cabecera del sitio: estrella de cuatro puntas sobre degradado. */
const LOGO_STAR = svgUri(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${C.night950}" d="M12 2l2.4 6.2L21 10l-6.6 1.8L12 18l-2.4-6.2L3 10l6.6-1.8L12 2z"/></svg>`,
);

function brand(size) {
  return h('div', { display: 'flex', alignItems: 'center', gap: size * 0.4 }, [
    h(
      'div',
      {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size * 1.3,
        height: size * 1.3,
        borderRadius: size * 0.32,
        backgroundImage: `linear-gradient(135deg, ${C.accent400}, ${C.cyan400})`,
      },
      [{ type: 'img', props: { src: LOGO_STAR, width: size * 0.75, height: size * 0.75 } }],
    ),
    h('div', { display: 'flex', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: size, color: '#fff', letterSpacing: -0.5 }, [
      'Star',
      h('span', { color: C.accent400 }, '4'),
      'cast',
    ]),
  ]);
}

function chip(text) {
  return h(
    'div',
    {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 22px',
      borderRadius: 999,
      border: '1.5px solid rgba(52,211,153,0.35)',
      backgroundColor: 'rgba(52,211,153,0.1)',
      fontFamily: 'JetBrains Mono',
      fontWeight: 500,
      fontSize: 22,
      letterSpacing: 2.5,
      textTransform: 'uppercase',
      color: C.accent300,
    },
    [h('div', { width: 10, height: 10, borderRadius: 999, backgroundColor: C.accent400 }, []), text],
  );
}

function titleSize(title) {
  if (title.length <= 42) return 68;
  if (title.length <= 60) return 60;
  if (title.length <= 75) return 54;
  return 48;
}

function background(children) {
  return h(
    'div',
    {
      width: W,
      height: H,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      backgroundColor: C.night950,
      backgroundImage:
        'radial-gradient(circle at 85% 0%, rgba(16,185,129,0.22), rgba(5,8,15,0) 55%), radial-gradient(circle at 0% 100%, rgba(34,211,238,0.10), rgba(5,8,15,0) 45%)',
      fontFamily: 'Inter',
    },
    [
      // Rejilla técnica del sitio (.bg-grid).
      h('div', {
        position: 'absolute',
        top: 0,
        left: 0,
        width: W,
        height: H,
        backgroundImage:
          'linear-gradient(rgba(148,163,184,0.07) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(148,163,184,0.07) 1.5px, transparent 1.5px)',
        backgroundSize: '56px 56px',
      }, []),
      ...children,
    ],
  );
}

function motifLayer(entry, height, opacity) {
  const svg = MOTIFS[entry.motif](rng(entry.seed), height);
  return h('div', { position: 'absolute', left: 0, bottom: 0, display: 'flex', opacity }, [
    { type: 'img', props: { src: svgUri(svg), width: W, height } },
  ]);
}

/** Imagen para compartir: marca, categoría, título y gráfico tenue. */
function ogImage(entry) {
  return background([
    motifLayer(entry, 300, 0.55),
    h('div', { display: 'flex', flexDirection: 'column', padding: '64px 80px', height: H, position: 'relative' }, [
      h('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, [brand(34), chip(entry.eyebrow)]),
      h(
        'div',
        {
          display: 'flex',
          marginTop: 56,
          maxWidth: 1000,
          fontFamily: 'Space Grotesk',
          fontWeight: 700,
          fontSize: titleSize(entry.title),
          lineHeight: 1.08,
          letterSpacing: -1.5,
          color: '#fff',
        },
        entry.title,
      ),
    ]),
  ]);
}

/** Portada para el sitio: sin título (ya está en la página), gráfico protagonista. */
function coverImage(entry) {
  return background([
    motifLayer(entry, 420, 1),
    h('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '56px 72px', position: 'relative' }, [
      chip(entry.eyebrow),
      brand(30),
    ]),
  ]);
}

// ------------------------------------------------------------------ render

const font = (pkg, file) => readFileSync(resolve(dirname(require.resolve(`${pkg}/package.json`)), 'files', file));
const fonts = [
  { name: 'Space Grotesk', weight: 700, style: 'normal', data: font('@fontsource/space-grotesk', 'space-grotesk-latin-700-normal.woff') },
  { name: 'Inter', weight: 400, style: 'normal', data: font('@fontsource/inter', 'inter-latin-400-normal.woff') },
  { name: 'JetBrains Mono', weight: 500, style: 'normal', data: font('@fontsource/jetbrains-mono', 'jetbrains-mono-latin-500-normal.woff') },
];

async function render(tree, outFile, width = W) {
  const svg = await satori(tree, { width: W, height: H, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng();
  const image = sharp(png);
  const out = outFile.endsWith('.webp')
    ? await image.webp({ quality: 82 }).toBuffer()
    : await image.jpeg({ quality: 86, mozjpeg: true }).toBuffer();
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, out);
}

const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {};
const next = {};
let generated = 0;

for (const entry of entries) {
  const hash = createHash('sha1')
    .update(JSON.stringify([DESIGN_VERSION, entry.eyebrow, entry.title, entry.motif, entry.seed]))
    .digest('hex')
    .slice(0, 12);
  next[entry.file] = hash;
  const base = resolve(OUT_DIR, entry.file);
  const files = [`${base}.jpg`, `${base}-cover.webp`, `${base}-thumb.webp`];
  if (manifest[entry.file] === hash && files.every((f) => existsSync(f))) continue;

  await render(ogImage(entry), files[0]);
  const cover = coverImage(entry);
  await render(cover, files[1]);
  await render(cover, files[2], 640);
  generated++;
}

// Borra las imágenes de entradas que ya no existen (p. ej. un slug renombrado).
let removed = 0;
for (const file of Object.keys(manifest)) {
  if (file in next) continue;
  for (const suffix of ['.jpg', '-cover.webp', '-thumb.webp']) {
    rmSync(resolve(OUT_DIR, file + suffix), { force: true });
  }
  removed++;
}

writeFileSync(MANIFEST, JSON.stringify(next, null, 2) + '\n', 'utf8');
console.info(`[og] ${entries.length} entradas, ${generated} regeneradas, ${removed} eliminadas en ${OUT_DIR}`);
