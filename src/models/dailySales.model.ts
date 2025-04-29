import { Sales } from "./sales.model";

export interface DailySales {
  date: string;
  total_revenue: number;
  total_count: number;
  sales_data: Sales[];
}
