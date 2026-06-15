"""Ingesta flexible de ficheros de inventario (CSV / Excel).

Pensada para aceptar "cualquier" fichero razonable sin configuración previa:
detecta el separador, mapea las columnas por nombre (alias en español e inglés)
y decide el tipo de import:

  - "sales":   hay fecha + unidades vendidas -> histórico de demanda directo.
  - "stock":   hay fecha + nivel de stock    -> deriva la demanda de la caída
               de stock entre snapshots consecutivos.
  - "catalog": no hay fecha (maestro de productos: stock actual, precio, etc.).

Devuelve un ``ParsedImport`` normalizado que la ruta persiste en la BD.
"""

from __future__ import annotations

import io
import unicodedata
from dataclasses import dataclass, field
from datetime import date

import pandas as pd

# Alias de columnas por rol. Se comparan normalizados (sin acentos, en minúsculas).
_ALIASES: dict[str, list[str]] = {
    "date": ["fecha", "date", "dia", "day", "fecha venta", "fecha de venta", "order date", "periodo"],
    "sku": ["sku", "codigo", "cod", "ref", "referencia", "product id", "id producto", "item",
            "articulo", "ean", "codigo articulo", "cod articulo"],
    "name": ["nombre", "name", "producto", "descripcion", "description", "titulo", "title",
             "denominacion"],
    "category": ["categoria", "category", "familia", "tipo", "grupo", "seccion"],
    "units": ["unidades", "cantidad", "ventas", "qty", "quantity", "units", "sold", "demanda",
              "salidas", "uds", "vendidas", "und"],
    "stock": ["stock", "existencias", "inventario", "on hand", "current stock", "stock actual",
              "disponible", "saldo"],
    "price": ["precio", "coste", "costo", "price", "cost", "pvp", "unit cost", "coste unitario",
              "precio unitario"],
    "lead_time": ["lead time", "plazo", "plazo entrega", "plazo de entrega", "tiempo entrega",
                  "lead"],
    "reorder": ["punto pedido", "punto de pedido", "reorder", "rop", "reorder point", "minimo"],
}


@dataclass
class ParsedImport:
    kind: str
    detected: dict[str, str]  # rol -> nombre de columna original
    products: dict[str, dict] = field(default_factory=dict)  # sku -> metadatos
    sales: list[tuple[str, date, float]] = field(default_factory=list)  # (sku, fecha, unidades)
    rows_total: int = 0
    rows_ok: int = 0
    rows_error: int = 0
    errors: list[dict] = field(default_factory=list)


def _norm(s: str) -> str:
    s = unicodedata.normalize("NFKD", str(s)).encode("ascii", "ignore").decode()
    return " ".join(s.lower().replace("_", " ").replace("-", " ").split())


def _match_columns(columns: list[str]) -> dict[str, str]:
    """Asigna cada rol a la primera columna cuyo nombre normalizado encaje."""
    norm = {c: _norm(c) for c in columns}
    mapping: dict[str, str] = {}
    used: set[str] = set()
    for role, aliases in _ALIASES.items():
        for alias in aliases:
            for col, ncol in norm.items():
                if col in used:
                    continue
                if ncol == alias or ncol.startswith(alias) or alias in ncol.split():
                    mapping[role] = col
                    used.add(col)
                    break
            if role in mapping:
                break
    return mapping


def _to_float(value) -> float | None:
    if value is None or (isinstance(value, float) and pd.isna(value)):
        return None
    if isinstance(value, (int, float)):
        return float(value)
    s = str(value).strip().replace("€", "").replace("$", "").replace(" ", "")
    if not s:
        return None
    # Formato español: 1.234,56 -> 1234.56 ; o 1234.56 directo.
    if "," in s and "." in s:
        s = s.replace(".", "").replace(",", ".")
    elif "," in s:
        s = s.replace(",", ".")
    try:
        return float(s)
    except ValueError:
        return None


def _read_dataframe(filename: str, content: bytes) -> pd.DataFrame:
    name = filename.lower()
    if name.endswith((".xlsx", ".xls")):
        return pd.read_excel(io.BytesIO(content))
    # CSV: deja que pandas infiera el separador (coma, punto y coma, tab).
    return pd.read_csv(io.BytesIO(content), sep=None, engine="python")


def parse_file(filename: str, content: bytes) -> ParsedImport:
    df = _read_dataframe(filename, content)
    df.columns = [str(c) for c in df.columns]
    cols = _match_columns(list(df.columns))

    if "sku" not in cols:
        raise ValueError(
            "No se encontró una columna de referencia/SKU. Incluye una columna "
            "como 'SKU', 'referencia' o 'código'."
        )

    has_date = "date" in cols
    has_units = "units" in cols
    has_stock = "stock" in cols
    if has_date and has_units:
        kind = "sales"
    elif has_date and has_stock:
        kind = "stock"
    else:
        kind = "catalog"

    result = ParsedImport(kind=kind, detected=cols, rows_total=int(len(df)))

    # --- Metadatos de producto (se acumulan; gana el último valor no nulo). ---
    def upsert_product(sku: str, row) -> None:
        p = result.products.setdefault(sku, {})
        if "name" in cols and pd.notna(row.get(cols["name"])):
            p["name"] = str(row[cols["name"]]).strip()
        if "category" in cols and pd.notna(row.get(cols["category"])):
            p["category"] = str(row[cols["category"]]).strip()
        if "price" in cols:
            v = _to_float(row.get(cols["price"]))
            if v is not None:
                p["unit_cost"] = v
        if "lead_time" in cols:
            v = _to_float(row.get(cols["lead_time"]))
            if v is not None:
                p["lead_time_days"] = int(v)
        if "reorder" in cols:
            v = _to_float(row.get(cols["reorder"]))
            if v is not None:
                p["reorder_point"] = int(v)
        if has_stock:
            v = _to_float(row.get(cols["stock"]))
            if v is not None:
                p["_stock_latest"] = (row.get(cols["date"]) if has_date else None, v)

    # Para "stock": acumula snapshots por sku/fecha y deriva la demanda al final.
    snapshots: dict[str, list[tuple[date, float]]] = {}

    for i, row in df.iterrows():
        try:
            sku_raw = row.get(cols["sku"])
            if pd.isna(sku_raw) or str(sku_raw).strip() == "":
                raise ValueError("SKU vacío")
            sku = str(sku_raw).strip()

            d: date | None = None
            if has_date:
                ts = pd.to_datetime(row.get(cols["date"]), dayfirst=True, errors="coerce")
                if pd.isna(ts):
                    raise ValueError("fecha no válida")
                d = ts.date()

            upsert_product(sku, row)

            if kind == "sales":
                u = _to_float(row.get(cols["units"]))
                if u is None:
                    raise ValueError("unidades no numéricas")
                result.sales.append((sku, d, max(u, 0.0)))
            elif kind == "stock":
                s = _to_float(row.get(cols["stock"]))
                if s is None:
                    raise ValueError("stock no numérico")
                snapshots.setdefault(sku, []).append((d, s))

            result.rows_ok += 1
        except Exception as exc:  # noqa: BLE001 - se reporta al usuario por fila
            result.rows_error += 1
            if len(result.errors) < 50:
                result.errors.append({"row": int(i) + 2, "reason": str(exc)})

    # Deriva demanda de los snapshots de stock (consumo = caída entre fechas).
    if kind == "stock":
        for sku, snaps in snapshots.items():
            snaps.sort(key=lambda x: x[0])
            for (d0, s0), (d1, s1) in zip(snaps, snaps[1:]):
                consumed = max(s0 - s1, 0.0)
                result.sales.append((sku, d1, consumed))
            if snaps:
                result.products.setdefault(sku, {})["current_stock"] = int(snaps[-1][1])

    # Resuelve el stock actual de los snapshots "_stock_latest" (caso catálogo).
    for sku, p in result.products.items():
        latest = p.pop("_stock_latest", None)
        if latest is not None and "current_stock" not in p:
            p["current_stock"] = int(latest[1])

    return result
