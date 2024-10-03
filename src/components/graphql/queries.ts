import { gql } from "@apollo/client";

export const GET_WEATHER = gql`
  query getWeather($lat: Float!, $lon: Float!) {
    getWeather(lat: $lat, lon: $lon) {
      time
      temperature
      windSpeed
      windDirection
      isDay
      weatherCode
    }
  }
`;
