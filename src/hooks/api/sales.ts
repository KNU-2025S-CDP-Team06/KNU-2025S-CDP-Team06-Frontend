import { getOneDaySales, getSales, getSalesParams } from "@services/sales";
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
