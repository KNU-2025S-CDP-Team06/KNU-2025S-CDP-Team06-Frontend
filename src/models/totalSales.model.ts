import { Sales } from "./sales.model";

export interface TotalSales {
  total_revenue: number;
  total_count: number;
  sales_data: Sales[];
}
