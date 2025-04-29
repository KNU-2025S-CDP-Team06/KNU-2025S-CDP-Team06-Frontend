import { getOnedayPredict } from "@services/predict";
import { useQuery } from "@tanstack/react-query";

export const useGetOneDayPredict = (date: string) => {
  return useQuery({
    queryKey: ["dailyPredict"],
    queryFn: () => getOnedayPredict({ date: date }),
  });
};
