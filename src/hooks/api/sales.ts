import {
  getDailySalesParams,
  getOneDaySales,
  getSales,
  getSalesParams,
  getTotalSales,
  getTotalSalesParams,
} from "@services/sales";
import { useQuery } from "@tanstack/react-query";

export const useGetOneDaySales = (params: getDailySalesParams) => {
  return useQuery({
    queryKey: ["dailySales", params.date],
    queryFn: () => getOneDaySales(params),
  });
};

export const useGetSales = (params: getSalesParams) => {
  return useQuery({
    queryKey: ["sales", params.startDate + params.endDate],
    queryFn: () => getSales(params),
  });
};

export const useGetTotalSales = (params: getTotalSalesParams) => {
  return useQuery({
    queryKey: ["totalSales", params.startDate + params.endDate],
    queryFn: () => getTotalSales(params),
  });
};
