import { Predict } from "@/models/predict.model";
import { getRequest } from "./api";

import { getMockRequest } from "./mocks";
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
  startHour?: number;
  endHour?: number;
};

export const getPredicts = async (params: getPredictsParams) => {
  //const id = sessionStorage.getItem("token");
  const response = await getMockRequest<Predict[]>(
    `/mocks/predictsManyDayData.json`,
    //`/sales/${id}`,
    {
      ...params,
      startDate: new Date(params.startDate).toISOString().slice(0, 19),
      endDate: new Date(params.endDate).toISOString().slice(0, 19),
    }
  );
  return response;
};
