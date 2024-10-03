import axios from "axios";

const OPEN_CAGE_API_KEY = "af0e169d4c7d4c75b4583d9908a92cdf"; 

// Function to fetch city options from OpenCage API
export const getCityOptions = async (city: string) => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${OPEN_CAGE_API_KEY}`
    );

    if (response.data.results.length === 0) {
      return [];
    }

    return response.data.results.map((result: any) => ({
      city: result.formatted, 
      lat: result.geometry.lat,  
      lon: result.geometry.lng,  
    }));
  } catch (error) {
    console.error('Error fetching city options:', error);
    return [];
  }
};
