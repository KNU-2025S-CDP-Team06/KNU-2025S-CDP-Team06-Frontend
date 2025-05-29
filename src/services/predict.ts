import { getRequest } from "./api";
import { PredictResponse } from "@/models/totalPredict.model";

export type getOnedayPredictParams = {
  date: string;
};

export const getOnedayPredict = async (params: getOnedayPredictParams) => {
  const response = await getRequest<PredictResponse>(
    // "/mocks/predictOnedayData.json", //API URL: `/forecast/${id}`,
    `/forecast`,
    {
      startDate: new Date(params.date).toISOString().slice(0, 19),
      endDate: new Date(params.date).toISOString().slice(0, 19),
    }
  );
  return response.forecast_data[0];
};

export type getPredictsParams = {
  startDate: string;
  endDate: string;
};

export const getPredicts = async (params: getPredictsParams) => {
  //const id = sessionStorage.getItem("token");
  const response = await getRequest<PredictResponse>(
    //`/mocks/predictsManyDayData.json`,
    `/forecast`,
    {
      ...params,
      startDate: new Date(params.startDate).toISOString().slice(0, 19),
      endDate: new Date(params.endDate).toISOString().slice(0, 19),
    }
  );
  return response.forecast_data;
};

export const getPredictsTotal = async (params: getPredictsParams) => {
  const response = await getRequest<PredictResponse>(`/forecast`, {
    ...params,
    startDate: new Date(params.startDate).toISOString().slice(0, 19),
    endDate: new Date(params.endDate).toISOString().slice(0, 19),
  });
  return response.total_prophet_forecast;
};
