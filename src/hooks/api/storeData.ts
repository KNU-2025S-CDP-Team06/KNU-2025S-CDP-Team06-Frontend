import { useQuery } from "@tanstack/react-query";
import { getStoreData } from "@services/storeData";

export const useGetStoreData = () => {
  return useQuery({
    queryKey: ["store"],
    queryFn: () => getStoreData(),
  });
};
