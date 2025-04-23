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
    "/mocks/salesDailyData.json",
    params
  );
  return response;
};

type getDailySalesParams = {
  date: Date;
};

export const getDailySales = async (params: getDailySalesParams) => {
  const response = await getRequest<DailySales[]>(
    "/mocks/salesDailyData.json",
    {
      startDate: params.date,
      endDate: params.date,
    }
  );
  return response[0];
};
