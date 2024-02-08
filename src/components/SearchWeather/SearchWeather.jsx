import React, { useState, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";

import AutoSuggestInput from "../AutoSuggestionInput/AutoSuggestionInput";

import { cn } from "../../utils/utils";
import getCities from "../../services/getCities";
import useDebounce from "../../hooks/useDebounce";

const SearchWeather = ({
  handleOnOptionClick,
  setGeoApiErrorMessage,
  cityName,
  setCityName,
}) => {
  const [results, setResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debouncedValue = useDebounce(cityName, 600);

  const getCityNameSuggestions = useCallback(
    async (inputValue) => {
      try {
        setGeoApiErrorMessage("");
        const data = await getCities(inputValue);

        setResults(data);
      } catch (error) {
        setGeoApiErrorMessage(
          error.response.data.message
            ? `While Fetching City Name Suggestions, ${error.response.data.message}`
            : `Error in Fetching City Name Suggestions!`
        );
        console.log("Error in Fetching city Name", error.response.data.message);
      }
    },
    [setGeoApiErrorMessage]
  );

  const handleChange = (value) => {
    setCityName(value);
    setShowSuggestions(value.trim() !== "");
  };

  useEffect(() => {
    if (debouncedValue) getCityNameSuggestions(debouncedValue);
  }, [debouncedValue, getCityNameSuggestions]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full md:w-[70%] pt-8 mb-14">
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

      <div>
        <button
          type="button"
          className={cn(
            "px-4 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none",
            cityName.trim() === "" &&
              "bg-blue-600 opacity-60 cursor-not-allowed"
          )}
          disabled={cityName.trim() === ""}
          onClick={() => {
            if (cityName.trim() === "") return;
            handleOnOptionClick(
              { value: "", label: "", latitude: "", longitude: "" },
              true
            );
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchWeather;
