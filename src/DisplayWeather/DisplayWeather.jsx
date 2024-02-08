import React from "react";
import Lottie from "react-lottie";

import { getAnimationByName, capitalizeFirstLetter } from "../utils/utils";

import { IoLocationOutline } from "react-icons/io5";

import windIcon from "../assets/wind.png";
import humidityIcon from "../assets/humidity.png";
import pressureIcon from "../assets/pressure.png";

const DisplayWeather = ({ currentWeather, setCurrentWeather }) => {
  //const date = new Date((currentWeather?.dt || 0) * 1000);

  return (
    <div className="flex flex-col items-center justify-between bg-gradient-to-br from-[#00feba] to-[#5b548a] text-white md:min-w-[500px] md:mt-8 pt-8 px-4 rounded-lg">
      <div className="flex flex-col gap-2 items-cemter justify-center">
        <div className="w-[200px] h-[200px] mx-auto">
          <Lottie
            {...getAnimationByName(
              currentWeather &&
                currentWeather.weather?.length > 0 &&
                currentWeather?.weather[0]?.main
                ? currentWeather.weather[0].main
                : ""
            )}
          />
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="flex items-end gap-2">
            <h1 className="flex text-8xl font-bold">
              <span>
                {currentWeather?.main?.temp
                  ? Math.floor(currentWeather.main.temp)
                  : ""}
              </span>
              <span className="text-4xl">&deg;C</span>
            </h1>
            <div className="flex text-2xl text-[#19202d]">
              {currentWeather?.weather &&
              currentWeather?.weather.length > 0 &&
              currentWeather?.weather[0]?.description
                ? capitalizeFirstLetter(currentWeather.weather[0].description)
                : ""}
            </div>
          </div>

          <p className="text-3xl flex font-semibold py-4">
            <IoLocationOutline /> {currentWeather.city}
          </p>
        </div>
      </div>

      <div className="flex justify-around items-center w-full mb-8">
        <div className="flex flex-col gap-2 items-center">
          <img src={humidityIcon} alt="" className="w-12 h-12" />
          <div className="flex flex-col">
            <div>{currentWeather?.main?.humidity || "-"} %</div>
            <div>Humidity</div>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <img src={windIcon} alt="" className="w-12 h-12" />
          <div className="flex flex-col">
            <div>{currentWeather?.wind?.speed || "-"} km/h</div>
            <div>Wind Speed</div>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <img src={pressureIcon} alt="" className="w-12 h-12 invert" />
          <div className="flex flex-col">
            <div>{currentWeather?.main?.pressure || "-"} hPa</div>
            <div>Pressure</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayWeather;
