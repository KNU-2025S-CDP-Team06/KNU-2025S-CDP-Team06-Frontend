import {
  getOneDaySales,
  getSales,
  getSalesParams,
  getTotalSales,
  getTotalSalesParams,
} from "@services/sales";
import { useQuery } from "@tanstack/react-query";

export const useGetOneDaySales = (date: string) => {
  return useQuery({
    queryKey: ["dailySales"],
    queryFn: () => getOneDaySales({ date: date }),
  });
};

export const useGetSales = (params: getSalesParams) => {
  return useQuery({
    queryKey: ["sales"],
    queryFn: () => getSales(params),
  });
};

export const useGetTotalSales = (params: getTotalSalesParams) => {
  return useQuery({
    queryKey: ["totalSales"],
    queryFn: () => getTotalSales(params),
  });
};
