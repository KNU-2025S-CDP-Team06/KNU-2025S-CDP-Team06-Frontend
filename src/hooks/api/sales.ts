import { getDailySales } from "@services/sales";
import { useQuery } from "@tanstack/react-query";

export const useGetDailySales = (date: Date) => {
  return useQuery({
    queryKey: ["dailySales"],
    queryFn: () => getDailySales({ date: date }),
  });
};
