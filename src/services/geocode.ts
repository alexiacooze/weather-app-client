// src/services/geocode.ts
import axios from "axios";

const OPEN_CAGE_API_KEY = "af0e169d4c7d4c75b4583d9908a92cdf"; // Replace with your API key


// This function will now return a list of matching city options
export const getCityOptions = async (city: string) => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${OPEN_CAGE_API_KEY}`
    );

    if (response.data.results.length === 0) {
      return [];
    }

    // Map results to an array of city options
    return response.data.results.map((result: any) => ({
      city: result.formatted,  // City name or full address
      lat: result.geometry.lat,  // Latitude
      lon: result.geometry.lng,  // Longitude
    }));
  } catch (error) {
    console.error('Error fetching city options:', error);
    return [];
  }
};
