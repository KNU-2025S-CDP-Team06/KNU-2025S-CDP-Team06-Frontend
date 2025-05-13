import { getOnedayPredict } from "@services/predict";
import { useQuery } from "@tanstack/react-query";

export const useGetOneDayPredict = (date: string) => {
  return useQuery({
    queryKey: ["dailyPredict", date],
    queryFn: () => getOnedayPredict({ date: date }),
  });
};
