"""Motor de previsión de demanda.

Estrategia:
  - Si ``statsforecast`` está disponible, usa modelos clásicos reales: AutoETS
    (estacionalidad), AutoARIMA y CrostonClassic para demanda intermitente.
  - Si la dependencia falla o un producto da error, cae a un baseline propio en
    numpy (media móvil estacional por día de la semana, suavizado exponencial y
    una tasa tipo Croston para series intermitentes).

Para cada producto devuelve: modelo usado, una métrica de error porcentual
robusta (WAPE, guardada en el campo ``mape``), la demanda diaria media prevista
y la serie completa (histórico + predicción con banda de confianza).

El cálculo de la banda es uniforme (punto ± z·σ, recortado a 0) para no depender
de que cada modelo emita intervalos nativos.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import date, timedelta

import numpy as np

try:  # statsforecast es opcional: si no carga, usamos el baseline numpy.
    import pandas as pd
    from statsforecast import StatsForecast
    from statsforecast.models import AutoETS, CrostonClassic, SeasonalNaive

    _HAS_SF = True
except Exception:  # pragma: no cover - depende del entorno
    _HAS_SF = False

# Factor z para el nivel de servicio del intervalo / stock de seguridad.
_Z = {0.90: 1.2816, 0.95: 1.6449, 0.975: 1.96, 0.99: 2.3263}
_SEASON = 7  # estacionalidad semanal sobre datos diarios


@dataclass
class ProductForecast:
    model: str
    mape: float | None
    daily_demand: float
    safety_stock: int
    projected_stockout_day: int | None
    series: list[dict] = field(default_factory=list)


def _z_for(level: float) -> float:
    return min(_Z.items(), key=lambda kv: abs(kv[0] - level))[1]


def build_daily(sales: list[tuple[date, float]], end: date, history_days: int) -> tuple[list[date], np.ndarray]:
    """Normaliza ventas dispersas a una serie diaria continua (huecos = 0)."""
    if sales:
        start = min(min(d for d, _ in sales), end - timedelta(days=history_days - 1))
    else:
        start = end - timedelta(days=history_days - 1)
    n = (end - start).days + 1
    dates = [start + timedelta(days=i) for i in range(n)]
    idx = {d: i for i, d in enumerate(dates)}
    y = np.zeros(n, dtype=float)
    for d, u in sales:
        if d in idx:
            y[idx[d]] += max(u, 0.0)
    return dates, y


def _is_intermittent(y: np.ndarray) -> bool:
    if y.size == 0:
        return True
    return (y > 0).mean() < 0.5


# --------------------------- Baseline numpy --------------------------- #

def _numpy_point(y: np.ndarray, horizon: int) -> tuple[str, np.ndarray]:
    n = y.size
    if n == 0:
        return "empty", np.zeros(horizon)
    if _is_intermittent(y):
        rate = float(y.mean())  # tasa media (equivalente a Croston en estable)
        return "CrostonBaseline", np.full(horizon, rate)
    if n >= _SEASON * 2:
        # Media por día de la semana, escalada por la tendencia reciente.
        dow = np.array([y[i::-_SEASON][: max(1, n // _SEASON)].mean() for i in range(_SEASON)])
        recent = y[-_SEASON * 2 :].mean()
        base = y.mean() if y.mean() > 0 else 1e-9
        weekly = dow * (recent / base if base else 1.0)
        out = np.array([weekly[i % _SEASON] for i in range(horizon)])
        return "SeasonalBaseline", np.clip(out, 0, None)
    # Suavizado exponencial simple (nivel).
    alpha, level = 0.3, float(y[0])
    for v in y[1:]:
        level = alpha * v + (1 - alpha) * level
    return "SESBaseline", np.full(horizon, max(level, 0.0))


# ------------------------- statsforecast ------------------------- #

def _sf_point(y: np.ndarray, dates: list[date], horizon: int) -> tuple[str, np.ndarray]:
    df = pd.DataFrame({"unique_id": "s", "ds": pd.to_datetime(dates), "y": y})
    if _is_intermittent(y):
        model, name = CrostonClassic(), "CrostonClassic"
    elif y.size >= _SEASON * 2:
        model, name = AutoETS(season_length=_SEASON), "AutoETS"
    else:
        model, name = SeasonalNaive(season_length=_SEASON), "SeasonalNaive"
    sf = StatsForecast(models=[model], freq="D", n_jobs=1)
    fc = sf.forecast(df=df, h=horizon)
    col = [c for c in fc.columns if c not in ("unique_id", "ds")][0]
    return name, np.clip(fc[col].to_numpy(dtype=float), 0, None)


def _point_forecast(y: np.ndarray, dates: list[date], horizon: int) -> tuple[str, np.ndarray]:
    if _HAS_SF:
        try:
            return _sf_point(y, dates, horizon)
        except Exception:
            pass
    return _numpy_point(y, horizon)


def _wape(actual: np.ndarray, pred: np.ndarray) -> float | None:
    """Error porcentual ponderado: robusto frente a ceros (a diferencia del MAPE)."""
    denom = float(np.abs(actual).sum())
    if denom <= 0:
        return None
    return round(float(np.abs(actual - pred).sum()) / denom * 100, 1)


def _backtest(y: np.ndarray, dates: list[date]) -> float | None:
    n = y.size
    h = min(14, n // 4)
    if n < 20 or h < 3:
        return None
    train, test = y[:-h], y[-h:]
    _, pred = _point_forecast(train, dates[:-h], h)
    return _wape(test, pred)


def forecast_product(
    sales: list[tuple[date, float]],
    current_stock: int,
    lead_time_days: int,
    today: date,
    history_days: int = 30,
    horizon: int = 30,
    service_level: float = 0.95,
) -> ProductForecast:
    dates, y = build_daily(sales, today, history_days)
    model, point = _point_forecast(y, dates, horizon)
    point = np.clip(point, 0, None)

    daily_demand = float(point.mean()) if point.size else 0.0
    sigma = float(y.std()) if y.size > 1 else daily_demand * 0.5
    z = _z_for(service_level)

    # Stock de seguridad: z·σ·√(lead time). Punto de pedido = demanda en el
    # lead time + colchón. (Los expone el dashboard como datos reales.)
    safety_stock = int(round(z * sigma * np.sqrt(max(lead_time_days, 1))))

    # Banda de confianza uniforme alrededor del punto.
    lo = np.clip(point - z * sigma, 0, None)
    hi = point + z * sigma

    # Proyección de stock para hallar la fecha de rotura.
    remaining = float(current_stock)
    stockout_day: int | None = None
    series: list[dict] = []

    hist_tail = y[-history_days:]
    hist_dates = dates[-history_days:]
    for i, (d, v) in enumerate(zip(hist_dates, hist_tail)):
        day = i - (len(hist_dates) - 1)  # ..., -2, -1, 0
        series.append({"day": day, "date": d.isoformat(), "value": round(float(v), 2),
                       "lo": None, "hi": None, "forecast": False})

    for h in range(horizon):
        remaining -= float(point[h])
        if stockout_day is None and remaining <= 0:
            stockout_day = h + 1
        series.append({
            "day": h + 1,
            "date": (today + timedelta(days=h + 1)).isoformat(),
            "value": round(float(point[h]), 2),
            "lo": round(float(lo[h]), 2),
            "hi": round(float(hi[h]), 2),
            "forecast": True,
        })

    return ProductForecast(
        model=model,
        mape=_backtest(y, dates),
        daily_demand=round(daily_demand, 3),
        safety_stock=safety_stock,
        projected_stockout_day=stockout_day,
        series=series,
    )
