import { Predict } from "@/models/predict.model";

export const calcPredictRevenue = (p: Predict, precision?: number) =>
  Math.floor(
    (p.prophet_forecast * (p.xgboost_forecast + 1)) /
      Math.pow(10, precision ?? 0)
  ) * Math.pow(10, precision ?? 0);
