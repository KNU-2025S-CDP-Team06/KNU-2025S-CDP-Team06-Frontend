export interface Predict {
  date_time: string;
  prophet_forecast: number;
  xgboost_forecast: number;
}
