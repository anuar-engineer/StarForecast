export interface Kpi {
  readonly total_products: number;
  readonly at_risk: number;
  readonly healthy: number;
  readonly inventory_value: number;
  readonly avg_days_of_cover: number;
}

export interface StockAlert {
  readonly sku: string;
  readonly name: string;
  readonly category: string;
  readonly current_stock: number;
  readonly days_of_cover: number | null;
  readonly projected_stockout_days: number | null;
  readonly severity: 'critical' | 'warning';
}

export interface SeriesPoint {
  readonly day: number;
  readonly value: number;
  readonly forecast: boolean;
}

export interface CategoryBreakdown {
  readonly category: string;
  readonly products: number;
  readonly inventory_value: number;
}

export interface DashboardSummary {
  readonly kpi: Kpi;
  readonly alerts: StockAlert[];
  readonly stock_series: SeriesPoint[];
  readonly categories: CategoryBreakdown[];
}
