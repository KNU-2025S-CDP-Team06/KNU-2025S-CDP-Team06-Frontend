import { Predict } from "@/models/predict.model";
import { getRequest } from "./api";

import { getMockRequest } from "./mocks";

export type getOnedayPredictParams = {
  date: string;
};

export const getOnedayPredict = async (params: getOnedayPredictParams) => {
  const id = sessionStorage.getItem("token");
  const response = await getRequest<Predict>(
    // "/mocks/predictOnedayData.json", //API URL: `/forecast/${id}`,
    `/forecast/${id}`,
    {
      dateTime: new Date(params.date).toISOString().slice(0, 19),
    }
  );
  return response;
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
