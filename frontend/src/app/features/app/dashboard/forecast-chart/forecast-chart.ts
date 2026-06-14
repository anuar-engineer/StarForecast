import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { SeriesPoint } from '../dashboard.models';

interface ChartGeom {
  readonly history: string; // path tramo histórico (línea sólida)
  readonly forecast: string; // path tramo forecast (línea punteada)
  readonly area: string; // relleno bajo toda la curva
  readonly todayX: number; // posición X de la línea "hoy"
  readonly hasData: boolean;
}

const W = 760;
const H = 260;
const PAD_Y = 16;

/**
 * Gráfico de área/línea de evolución de stock, dibujado con SVG puro (sin
 * librerías) para que sea ligero y seguro en SSR. El tramo de predicción se
 * pinta punteado y se marca el día de hoy.
 */
@Component({
  selector: 'app-forecast-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './forecast-chart.html',
})
export class ForecastChart {
  readonly data = input.required<SeriesPoint[]>();

  protected readonly w = W;
  protected readonly h = H;

  protected readonly geom = computed<ChartGeom>(() => {
    const pts = this.data();
    if (!pts || pts.length < 2) {
      return { history: '', forecast: '', area: '', todayX: 0, hasData: false };
    }

    const values = pts.map((p) => p.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const span = max - min || 1;
    const n = pts.length;

    const x = (i: number) => (i / (n - 1)) * W;
    const y = (v: number) => H - PAD_Y - ((v - min) / span) * (H - PAD_Y * 2);

    const coords = pts.map((p, i) => ({ px: x(i), py: y(p.value), forecast: p.forecast }));

    // Índice del último punto histórico (day <= 0). El forecast empieza ahí
    // para que ambos tramos queden conectados visualmente.
    let splitIdx = coords.findIndex((c) => c.forecast);
    if (splitIdx === -1) splitIdx = n - 1;
    const joinIdx = Math.max(0, splitIdx - 1);

    const toPath = (slice: { px: number; py: number }[]) =>
      slice.map((c, i) => `${i === 0 ? 'M' : 'L'}${c.px.toFixed(1)},${c.py.toFixed(1)}`).join(' ');

    const history = toPath(coords.slice(0, splitIdx));
    const forecast = toPath(coords.slice(joinIdx));

    const line = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c.px.toFixed(1)},${c.py.toFixed(1)}`).join(' ');
    const area = `${line} L${W},${H} L0,${H} Z`;

    return { history, forecast, area, todayX: coords[joinIdx].px, hasData: true };
  });
}
