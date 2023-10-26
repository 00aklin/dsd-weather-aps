import axios from "axios";
import { API_URL } from "@env";

/**
 *  params: { location: string }
 */
const forecastEndPoint = (params) => `${API_URL}/forecast/${params.location}`;

/**
 *  params: { search: string }
 */
const searchEndPoint = (params) => `${API_URL}/search/${params.search}`;

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
