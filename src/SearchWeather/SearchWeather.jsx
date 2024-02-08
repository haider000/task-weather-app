import React, { useState, useEffect, useCallback } from "react";
import useDebounce from "./useDebounce";
import { FaSearch } from "react-icons/fa";
import AutoSuggestInput from "../AutoSuggestionInput/AutoSuggestionInput";
import { GEO_API_URL, geoApiOptions } from "../configs/constants";

const SearchWeather = ({ handleOnOptionClick, setErrorMessage, cityName, setCityName }) => {
  const [results, setResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debouncedValue = useDebounce(cityName, 600);

  const getCityNameSuggestions = useCallback(
    async (inputValue) => {
      try {
        const response = await fetch(
          `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
          geoApiOptions
        );
        const data = await response.json();

        if (data) {
          setResults(
            data.data.map((city) => ({
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            }))
          );
        }
      } catch (error) {
        setErrorMessage("No city found with given initials!");
        console.log("Error in Fetching city Name", error, error.message);
      }
    },
    [setErrorMessage]
  );

  const handleChange = (value) => {
    setCityName(value);
    setShowSuggestions(value.trim() !== "");
  };

  useEffect(() => {
    if (debouncedValue) getCityNameSuggestions(debouncedValue);
  }, [debouncedValue, getCityNameSuggestions]);

  return (
    <div className="flex gap-4 w-[70%] pt-8">
      <AutoSuggestInput
        setValue={setCityName}
        suggestions={results}
        onSuggestionSelect={handleOnOptionClick}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
      >
        <div className="flex items-center w-[100%] h-[2.5rem] border-2 border-gray-300 rounded-xl py-0 px-[16px] shadow-xl bg-white">
          <FaSearch className="text-black-500" />
          <input
            className="bg-transparent border-none h-[100%] w-[100%] ml-2 text-2xl  focus:outline-none"
            placeholder="Type to search..."
            value={cityName}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      </AutoSuggestInput>

      {/*<div>
        <button
          type="button"
          className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => handleOnOptionClick({}, true)}
        >
          Search
        </button>
      </div>*/}
    </div>
  );
};

export default SearchWeather;
