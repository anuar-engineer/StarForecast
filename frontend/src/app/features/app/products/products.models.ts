export interface Product {
  readonly id: number;
  readonly sku: string;
  readonly name: string;
  readonly category: string;
  readonly current_stock: number;
  readonly reorder_point: number;
  readonly unit_cost: number;
  readonly lead_time_days: number;
  readonly avg_daily_sales: number;
  readonly forecast_model: string | null;
  readonly forecast_mape: number | null;
  readonly forecast_daily_demand: number | null;
  readonly safety_stock: number | null;
  readonly projected_stockout_day: number | null;
  readonly days_of_cover: number | null;
  readonly inventory_value: number;
  readonly forecast_updated_at: string | null;
}

export interface ForecastPoint {
  readonly day: number;
  readonly date: string;
  readonly value: number;
  readonly lo: number | null;
  readonly hi: number | null;
  readonly forecast: boolean;
}

export interface ProductDetail extends Product {
  readonly series: ForecastPoint[];
}
