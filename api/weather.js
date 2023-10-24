import axios from "axios";
import { API_KEY } from "./constants";

const forecastEndPoint = (params) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=sao-paulo&days=7&aqi=no&alerts=no`;

const apiCall = async (endPoint) => {
  const options = {
    method: "GET",
    url: endPoint,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error({ error });
    return null;
  }
};

export const fetchForecastDays = (params) => {
  return apiCall(forecastEndPoint(params));
};
