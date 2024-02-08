import React, { useState, useEffect } from "react";
import DisplayWeather from "./DisplayWeather/DisplayWeather";
import SearchWeather from "./SearchWeather/SearchWeather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./constants";

function App() {
  const [cityName, setCityName] = useState("");
  const [currentWeather, setCurrentWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnOptionClick = async (searchData, searchByCityName=false) => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const [lat, lon] = searchData.value.split(" ");
      const response = await fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );

      localStorage.setItem("lastCity", JSON.stringify(searchData));
      const currentCityWeather = await response.json();
      setIsLoading(false);
      setCurrentWeather({ city: searchData.label, ...currentCityWeather });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setErrorMessage("Weather Api breaks!");
    }
  };

  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) {
      handleOnOptionClick(JSON.parse(savedCity));
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-around h-[100vh] w-[100vw] p-8 md:m-0 bg-[#19202d]">
      <div className="flex flex-col w-full">
        <SearchWeather
          currentWeather={currentWeather}
          setCurrentWeather={setCurrentWeather}
          handleOnOptionClick={handleOnOptionClick}
          setErrorMessage={setErrorMessage}
          cityName={cityName}
          setCityName={setCityName}
        />

        {errorMessage && (
          <p className="text-red-300 text-xl my-8">{errorMessage}</p>
        )}
      </div>

      {isLoading  ? (
        <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
          <div className="flex justify-center items-center mt-[50vh]">
            <div className="fas fa-circle-notch fa-spin fa-5x text-violet-600"></div>
          </div>
        </div>
      ) : (
        <DisplayWeather
          currentWeather={currentWeather}
          setCurrentWeather={setCurrentWeather}
        />
      )}
    </div>
  );
}

export default App;
