import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_WEATHER } from "../graphql/queries";
import { getCityOptions } from "../../services/geocode";

interface WeatherData {
  getWeather: {
    time: string;
    temperature: number;
    windSpeed: number;
    windDirection: number;
    isDay: number;
    weatherCode: number;
  };
}

interface CityOption {
  city: string;
  lat: number;
  lon: number;
}

const Weather: React.FC = () => {
  const [city, setCity] = useState("");
  const [cityOptions, setCityOptions] = useState<CityOption[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
  const [isInvalidCity, setIsInvalidCity] = useState(false);

  const [fetchWeather, { data, loading, error }] =
    useLazyQuery<WeatherData>(GET_WEATHER);

  // Fetch weather data when a city is selected
  const handleCityInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setCity(input);
    setSelectedCity(null);

    if (input.length > 2) {
      const options = await getCityOptions(input);
      setCityOptions(options);
    } else {
      setCityOptions([]);
    }
    setIsInvalidCity(false);
  };

  // Handle when a city is selected from the dropdown
  const handleCitySelect = (cityOption: CityOption) => {
    setCity(cityOption.city);
    setSelectedCity(cityOption);
    setCityOptions([]);
    setIsInvalidCity(false);
  };

  // Handle when the user submits the city
  const handleSearch = () => {
    if (!selectedCity) {
      setIsInvalidCity(true);
      return;
    }
    fetchWeather({
      variables: { lat: selectedCity.lat, lon: selectedCity.lon },
    });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Weather App
      </h1>
      
        {/* City input */}
      <div className="relative mb-4">
        <label className="block mb-2 text-gray-700 font-semibold">
          Enter City Name
        </label>
        <input
          type="text"
          value={city}
          onChange={handleCityInput}
          placeholder="Search city..."
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
            isInvalidCity ? "border-red-500" : "border-gray-300"
          }`}
        />

        {/* Autocomplete dropdown */}
        {cityOptions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-auto mt-2">
            {cityOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleCitySelect(option)}
                className="cursor-pointer p-3 hover:bg-blue-100"
              >
                {option.city}
              </li>
            ))}
          </ul>
        )}

        {/*Input Validation*/}
        {isInvalidCity && (
          <p className="text-red-500 mt-2 text-sm">
            Please select a city from the dropdown list.
          </p>
        )}
      </div>

    
      <button
        onClick={handleSearch}
        className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
      >
        Search
      </button>
      
      {/* Loading and error messages */}
      {loading && (
        <p className="mt-4 text-blue-600 font-semibold">
          Loading weather data...
        </p>
      )}

      {error && (
        <p className="mt-4 text-red-600 font-semibold">
          Error: {error.message}
        </p>
      )}

      {/* Weather data */}
      {data && selectedCity && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Weather in {selectedCity.city}:
          </h2>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-lg">
              <span className="font-bold">Time:</span> {data.getWeather.time}
            </p>
            <p className="text-lg">
              <span className="font-bold">Temperature:</span>{" "}
              {data.getWeather.temperature} °C
            </p>
            <p className="text-lg">
              <span className="font-bold">Wind Speed:</span>{" "}
              {data.getWeather.windSpeed} km/h
            </p>
            <p className="text-lg">
              <span className="font-bold">Wind Direction:</span>{" "}
              {data.getWeather.windDirection}°
            </p>
            <p className="text-lg">
              <span className="font-bold">Daytime:</span>{" "}
              {data.getWeather.isDay ? "Yes" : "No"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
