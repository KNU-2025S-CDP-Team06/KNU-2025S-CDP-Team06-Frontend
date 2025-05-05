import { getTotalSales, getTotalSalesParams } from "@services/totalSales";
import { useQuery } from "@tanstack/react-query";

export const useGetTotalSales = (params: getTotalSalesParams) => {
  return useQuery({
    queryKey: ["totalSales"],
    queryFn: () => getTotalSales(params),
  });
};
