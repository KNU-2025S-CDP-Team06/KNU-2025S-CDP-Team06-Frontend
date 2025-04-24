import { getRequest } from "./api";
import { DailySales } from "@/models/dailySales.model";

type getSalesParams = {
  startDate: Date;
  endDate: Date;
  startHour?: string;
  endHour?: string;
};

export const getSales = async (params: getSalesParams) => {
  const response = await getRequest<DailySales[]>(
    "/mocks/salesManyDayData.json", //API URL: /sales/{:id}
    params
  );
  return response;
};

type getDailySalesParams = {
  date: Date;
};

export const getOneDaySales = async (params: getDailySalesParams) => {
  const response = await getRequest<DailySales[]>(
    "/mocks/salesOneDayData.json", //API URL: /sales/{:id}
    {
      startDate: params.date,
      endDate: params.date,
    }
  );
  return response[0];
};
