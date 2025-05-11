import { getWeather } from "@services/weather";
import { useQuery } from "@tanstack/react-query";

export const useGetWeather = (date: string) => {
  return useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ date: date }),
  });
};
