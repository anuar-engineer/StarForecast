// Genera los iconos rasterizados de marca a partir del logo de Star4cast
// (cuadrado con gradiente accent-400 -> cyan-400 y la estrella de 4 puntas en
// night-950). Reproduce el mark del navbar/footer sin dependencias externas:
// rasteriza con supersampling y codifica PNG con el zlib nativo de Node.
//
// Salidas: frontend/public/favicon.ico (16+32) y apple-touch-icon.png (180).
// Uso: `node scripts/generate-favicon.mjs` desde la raíz del repo.

import { deflateSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, '..', 'frontend', 'public');

// --- Paleta de marca (tailwind.css) ---
const GRAD_A = [0x34, 0xd3, 0x99]; // accent-400 #34d399 (esquina superior izq.)
const GRAD_B = [0x22, 0xd3, 0xee]; // cyan-400   #22d3ee (esquina inferior der.)
const STAR = [0x05, 0x08, 0x0f]; //  night-950  #05080f

// Estrella de 4 puntas en el espacio 32x32 (path del navbar trasladado +4,+6).
const STAR_PTS = [
  [16, 8], [18.4, 14.2], [25, 16], [18.4, 17.8],
  [16, 24], [13.6, 17.8], [7, 16], [13.6, 14.2],
];

const SS = 4; // factor de supersampling para el antialiasing

function lerp(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

/** Punto dentro del cuadrado redondeado de lado `n` (radio proporcional al de 32). */
function insideRoundedRect(x, y, n) {
  const r = (7 / 32) * n;
  if (x < 0 || y < 0 || x > n || y > n) return false;
  const cx = Math.min(Math.max(x, r), n - r);
  const cy = Math.min(Math.max(y, r), n - r);
  const dx = x - cx;
  const dy = y - cy;
  return dx * dx + dy * dy <= r * r;
}

/** Ray casting: punto dentro del polígono `pts` (escalado de 32 a `n`). */
function insidePolygon(x, y, pts, n) {
  const s = n / 32;
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const xi = pts[i][0] * s, yi = pts[i][1] * s;
    const xj = pts[j][0] * s, yj = pts[j][1] * s;
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/** Devuelve un buffer RGBA (n*n*4) con el icono renderizado y antialiased. */
function renderRGBA(n) {
  const out = Buffer.alloc(n * n * 4);
  for (let py = 0; py < n; py++) {
    for (let px = 0; px < n; px++) {
      let aSum = 0; // cobertura del cuadrado
      let sSum = 0; // cobertura de la estrella
      let rAcc = 0, gAcc = 0, bAcc = 0; // color del fondo (sin estrella)
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const x = px + (sx + 0.5) / SS;
          const y = py + (sy + 0.5) / SS;
          if (!insideRoundedRect(x, y, n)) continue;
          aSum++;
          if (insidePolygon(x, y, STAR_PTS, n)) {
            sSum++;
          } else {
            const t = (x / n + y / n) / 2;
            const c = lerp(GRAD_A, GRAD_B, t);
            rAcc += c[0]; gAcc += c[1]; bAcc += c[2];
          }
        }
      }
      const total = SS * SS;
      const i = (py * n + px) * 4;
      const alpha = aSum / total;
      if (aSum === 0) {
        out[i] = out[i + 1] = out[i + 2] = out[i + 3] = 0;
        continue;
      }
      // Mezcla el fondo (gradiente) con la estrella según su cobertura.
      const bgCount = aSum - sSum;
      const bg = bgCount > 0 ? [rAcc / bgCount, gAcc / bgCount, bAcc / bgCount] : GRAD_A;
      const starFrac = sSum / aSum;
      const r = bg[0] * (1 - starFrac) + STAR[0] * starFrac;
      const g = bg[1] * (1 - starFrac) + STAR[1] * starFrac;
      const b = bg[2] * (1 - starFrac) + STAR[2] * starFrac;
      out[i] = Math.round(r);
      out[i + 1] = Math.round(g);
      out[i + 2] = Math.round(b);
      out[i + 3] = Math.round(alpha * 255);
    }
  }
  return out;
}

// --- Codificador PNG mínimo (RGBA, 8 bits) ---
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function encodePNG(rgba, n) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(n, 0);
  ihdr.writeUInt32BE(n, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  // 10,11,12 = 0 (compresión/filtro/entrelazado por defecto)
  const raw = Buffer.alloc(n * (n * 4 + 1));
  for (let y = 0; y < n; y++) {
    raw[y * (n * 4 + 1)] = 0; // filtro None
    rgba.copy(raw, y * (n * 4 + 1) + 1, y * n * 4, (y + 1) * n * 4);
  }
  const idat = deflateSync(raw, { level: 9 });
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// --- Contenedor ICO con PNGs embebidos ---
function encodeICO(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reservado
  header.writeUInt16LE(1, 2); // tipo: icono
  header.writeUInt16LE(count, 4);
  const dir = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;
  const blobs = [];
  images.forEach((img, idx) => {
    const o = idx * 16;
    dir[o] = img.size >= 256 ? 0 : img.size;
    dir[o + 1] = img.size >= 256 ? 0 : img.size;
    dir[o + 2] = 0; // paleta
    dir[o + 3] = 0; // reservado
    dir.writeUInt16LE(1, o + 4); // planos
    dir.writeUInt16LE(32, o + 6); // bits por pixel
    dir.writeUInt32LE(img.png.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += img.png.length;
    blobs.push(img.png);
  });
  return Buffer.concat([header, dir, ...blobs]);
}

// --- Generación ---
const icoSizes = [16, 32, 48];
const icoImages = icoSizes.map((size) => ({ size, png: encodePNG(renderRGBA(size), size) }));
writeFileSync(resolve(PUBLIC, 'favicon.ico'), encodeICO(icoImages));
console.info(`[favicon] favicon.ico generado (${icoSizes.join(', ')} px)`);

const apple = 180;
writeFileSync(resolve(PUBLIC, 'apple-touch-icon.png'), encodePNG(renderRGBA(apple), apple));
console.info(`[favicon] apple-touch-icon.png generado (${apple} px)`);
