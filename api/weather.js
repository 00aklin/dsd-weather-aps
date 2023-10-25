import axios from "axios";
import { API_KEY } from "./constants";

/**
 *  params: { location: string }
 */
const forecastEndPoint = (params) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${params.location}&days=7&aqi=no&alerts=no&lang=pt`;

/**
 *  params: { search: string }
 */
const searchEndPoint = (params) =>
  `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${params.search}`;

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

/**
 *  params: { location: string }
 */
export const fetchForecastDays = (params) => {
  return apiCall(forecastEndPoint(params));
};

/**
 *  params: { search: string }
 */
export const fetchSearchLocations = (params) => {
  return apiCall(searchEndPoint(params));
};
