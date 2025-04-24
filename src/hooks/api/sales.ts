import { getOneDaySales } from "@services/sales";
import { useQuery } from "@tanstack/react-query";

export const useGetOneDaySales = (date: Date) => {
  return useQuery({
    queryKey: ["dailySales"],
    queryFn: () => getOneDaySales({ date: date }),
  });
};
