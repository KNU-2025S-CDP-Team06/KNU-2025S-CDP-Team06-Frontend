import { Predict } from "./predict.model";

export interface PredictResponse {
  total_prophet_forecast: number;
  forecast_data: Predict[];
}
