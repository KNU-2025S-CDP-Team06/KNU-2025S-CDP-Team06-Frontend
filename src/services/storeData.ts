import { getRequest } from "./api";
import { StoreData } from "@/models/storeData.model";

export interface getStoreDataParams {
  id: string | number;
}

export const getStoreData = async (params: getStoreDataParams) => {
  const { id } = params;
  const response = await getRequest<StoreData>(`/store/${id}`);

  return response;
};
