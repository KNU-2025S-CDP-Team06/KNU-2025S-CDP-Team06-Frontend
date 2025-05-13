import { Predict } from "@/models/predict.model";
import { getRequest } from "./api";

export type getOnedayPredictParams = {
  date: string;
};

export const getOnedayPredict = async (params: getOnedayPredictParams) => {
  const response = await getRequest<Predict>(
    "/mocks/predictOnedayData.json", //API URL: `/forecast/${id}`,
    {
      dateTime: new Date(params.date).toISOString().slice(0, 19),
    }
  );
  return response;
};
