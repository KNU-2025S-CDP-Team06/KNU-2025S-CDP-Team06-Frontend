import { getRequest } from "./api";
import { TotalSales } from "@/models/totalSales.model";

export type getTotalSalesParams = {
  startDate: string;
  endDate: string;
  startHour?: string;
  endHour?: string;
};

export const getTotalSales = async (params: getTotalSalesParams) => {
  const response = await getRequest<TotalSales>(
    "/mocks/totalSalesData.json", //API URL: /sales/total/{id}
    {
      ...params,
      startDate: new Date(params.startDate).toISOString(),
      endDate: new Date(params.endDate).toISOString(),
    }
  );
  return response;
};
