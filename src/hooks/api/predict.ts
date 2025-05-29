import {
  getOnedayPredict,
  getPredicts,
  getPredictsParams,
} from "@services/predict";
import { useQuery } from "@tanstack/react-query";

export const useGetOneDayPredict = (date: string) => {
  return useQuery({
    queryKey: ["dailyPredict", date],
    queryFn: () => getOnedayPredict({ date: date }),
  });
};

export const useGetPredicts = (params: getPredictsParams) => {
  return useQuery({
    queryKey: ["predicts", params.startDate + params.endDate],
    queryFn: () => getPredicts(params),
  });
};

export const useGetPredictsTotal = (params: getPredictsParams) => {
  return useQuery({
    queryKey: ["predictsTotal", params.startDate + params.endDate],
    queryFn: () => getPredicts(params),
  });
};
