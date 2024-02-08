import axios from "axios";

import { WEATHER_API_URL } from "../configs/constants";

const getWeather = async (searchData, cityName, searchByCityName = false) => {
  const { latitude, longitude } = searchData;
  let response = {};
  if (searchByCityName) {
    if (cityName && cityName.trim() && cityName.length > 0) {
      response = await axios.get(`${WEATHER_API_URL}&q=${cityName.trim()}`);
      return response.data;
    }
  } else {
    if (latitude && longitude) {
      response = await axios.get(
        `${WEATHER_API_URL}&lat=${latitude}&lon=${longitude}`
      );
      return response.data;
    }
  }

  return response;
};

export default getWeather;
