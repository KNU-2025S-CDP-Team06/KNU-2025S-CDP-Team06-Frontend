import { Weather } from "@/models/weather.model";
import { getRequest } from "./api";

export type getWeatherParams = {
  date: string;
};

export const getWeather = async (params: getWeatherParams) => {
  const response = await getRequest<Weather>(
    // "/mocks/weatherData.json", //API URL: `/weather/${id}`
    `/weather`,
    {
      dateTime: new Date(params.date).toISOString().slice(0, 19),
    }
  );
  return response;
};
