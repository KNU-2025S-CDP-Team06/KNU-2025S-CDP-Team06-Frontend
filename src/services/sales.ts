import { TotalSales } from "@/models/totalSales.model";
import { getRequest } from "./api";
import { DailySales } from "@/models/dailySales.model";

export type getSalesParams = {
  startDate: string;
  endDate: string;
  startHour?: number;
  endHour?: number;
};

export const getSales = async (params: getSalesParams) => {
  const id = sessionStorage.getItem("token");
  const response = await getRequest<DailySales[]>(
    // "/mocks/salesManyDayData.json", //API URL: `/sales/${id}`
    `/sales/${id}`,
    {
      ...params,
      startDate: new Date(params.startDate).toISOString().slice(0, 19),
      endDate: new Date(params.endDate).toISOString().slice(0, 19),
    }
  );
  return response;
};

export type getDailySalesParams = {
  date: string;
  startHour?: number;
  endHour?: number;
};

export const getOneDaySales = async (params: getDailySalesParams) => {
  const id = sessionStorage.getItem("token");
  const response = await getRequest<DailySales[]>(
    // "/mocks/salesOneDayData.json", //API URL: `/sales/${id}`
    `/sales/${id}`,
    {
      ...params,
      startDate: new Date(params.date).toISOString().slice(0, 19),
      endDate: new Date(params.date).toISOString().slice(0, 19),
    }
  );
  return response[0];
};

export type getTotalSalesParams = {
  startDate: string;
  endDate: string;
  startHour?: number;
  endHour?: number;
};

export const getTotalSales = async (params: getTotalSalesParams) => {
  const id = sessionStorage.getItem("token");
  const response = await getRequest<TotalSales>(
    // "/mocks/totalSalesData.json", //API URL: `/sales/total/${id}`,
    `/sales/total/${id}`,
    {
      ...params,
      startDate: new Date(params.startDate).toISOString().slice(0, 19),
      endDate: new Date(params.endDate).toISOString().slice(0, 19),
    }
  );
  return response;
};
