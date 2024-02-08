/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";

import DisplayWeather from "./components/DisplayWeather/DisplayWeather";
import SearchWeather from "./components/SearchWeather/SearchWeather";
import Loader from "./components/Loader/Loader";

import getWeather from "./services/getWeather";

function App() {
  const [cityName, setCityName] = useState("");
  const [currentWeather, setCurrentWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherApiErrorMessage, setWeatherApiErrorMessage] = useState("");
  const [geoApiErrorMessage, setGeoApiErrorMessage] = useState("");

  const handleOnOptionClick = useCallback(
    async (searchData, searchByCityName = false) => {
      try {
        setIsLoading(true);
        setWeatherApiErrorMessage("");

        const currentCityWeather = await getWeather(
          searchData,
          cityName,
          searchByCityName
        );

        localStorage.setItem("lastCity", JSON.stringify(searchData));
        setIsLoading(false);
        setCurrentWeather({ city: searchData.label, ...currentCityWeather });
      } catch (error) {
        setIsLoading(false);
        console.log("Weather Api breaks!", error.response.data.message);
        setWeatherApiErrorMessage(`Error: ${error.response.data.message}`);
      }
    },
    [cityName]
  );

  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) {
      handleOnOptionClick(JSON.parse(savedCity));
    }
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col lg:flex-row justify-around h-full sm:h-[100vh] w-[100vw] py-8 px-3 md:px-20 md:m-0 bg-[#19202d]">
        <div className="flex flex-col w-full justify-between">
          <SearchWeather
            currentWeather={currentWeather}
            setCurrentWeather={setCurrentWeather}
            handleOnOptionClick={handleOnOptionClick}
            setGeoApiErrorMessage={setGeoApiErrorMessage}
            cityName={cityName}
            setCityName={setCityName}
          />

          {(geoApiErrorMessage || weatherApiErrorMessage) && (
            <div className="my-6 max-w-[70%] bg-gray-800 items-center rounded-md p-3">
              {weatherApiErrorMessage && (
                <p className="">
                  <span className="text-red-500 text-2xl font-bold">
                    Error:
                  </span>
                  <span className="text-base pl-4 text-white">
                    {weatherApiErrorMessage}
                  </span>
                </p>
              )}

              {geoApiErrorMessage && (
                <div className="flex flex-col gap-2">
                  <p className="">
                    <span className="text-red-500 text-2xl font-bold">
                      Error:
                    </span>
                    <span className="text-base pl-4 text-white">
                      {geoApiErrorMessage}
                    </span>
                  </p>
                  <p className="pt-4">
                    <span className="text-green-500 text-2xl font-bold">
                      Suggestion:
                    </span>
                    <span className="text-base pl-4 text-white">
                      Press the search button to retrieve weather details for
                      the city you entered in the input box.
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <DisplayWeather
          currentWeather={currentWeather}
          setCurrentWeather={setCurrentWeather}
        />
      </div>
    </>
  );
}

export default App;
