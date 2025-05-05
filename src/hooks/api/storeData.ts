import { useQuery } from "@tanstack/react-query";
import { getStoreData, getStoreDataParams } from "@services/storeData";

export const useGetStoreData = (params: getStoreDataParams) => {
  const { id } = params;

  return useQuery({
    queryKey: ["store", id],
    queryFn: () => getStoreData(params),
  });
};
