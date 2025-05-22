import { getRequest } from "./api";
import { StoreData } from "@/models/storeData.model";

export const getStoreData = async () => {
  const response = await getRequest<StoreData>(`/store`);

  return response;
};
