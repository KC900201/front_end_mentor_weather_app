import axios from "axios"
import { fetchWeatherApi } from "openmeteo"

// demonstration on how to use openmeteo api
// - https://open-meteo.com/en/docs?latitude=3.1412&longitude=101.6865
// https://www.npmjs.com/package/openmeteo - update the data format according to example
export interface GeocodingLocationItem {
  id: number
  name: string
  latitude: number
  longitude: number
  country: string
  country_code: string
  admin1?: string
}

export interface GeocodingApiResponse {
  generationtime_ms: number
  results: GeocodingLocationItem[]
}


// Continue here
export interface WeatherApiResponse {
  current: {
    temperature_2m: number
    apparent_temperature: number
    relative_humidity_2m: number
    wind_speed_10m: number
    precipitation: number
    weather_code: number
    is_day: number
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    weather_code: number[]
  }
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    weather_code: number[]
  }
}


// Weather code to description and code mapping
export const weatherCodeMap: Record<number, { description: string; icon: string }> = {
  0: { description: "Clear sky", icon: 'sun' },
  1: { description: "Mainly clear", icon: "sun"},
  2: { description: "Partly cloudy", icon: "cloud-sun" },
  3: { description: "Overcast", icon: "cloud" },
  45: { description: "Foggy", icon: "cloud-fog" },
  48: { description: "Depositing rime fog", icon: "cloud-fog" },
  51: { description: "Light drizzle", icon: "cloud-drizzle"},
  53: { description: "Moderate drizzle", icon: "cloud-drizzle" },
  55: { description: "Dense drizzle", icon: "cloud-drizzle" },
  61: { description: "Slight rain", icon: "cloud-rain" },
  63: { description: "Moderate rain", icon: "cloud-rain" },
  65: {description: "Heavy rain", icon: "cloud-rain"},
  66: {description: "Light freezing rain", icon: "cloud-rain"},
  67: { description: "Heavy freezing rain", icon: "cloud-rain"},
  71: { description: "Slight snow", icon: "cloud-snow"},
  73: { description: "Moderate snow", icon: "cloud-snow"},
  75: { description: "Heavy snow", icon: "cloud-snow"},
  77: { description: "Snow grains", icon: "cloud-snow"},
  80: { description: "Slight rain showers", icon: "cloud-rain"},
  81: { description: "Moderate rain showers", icon: "cloud-rain"},
  82: { description: "Violent rain showers", icon: "cloud-rain"},
  85: { description: "Slight snow showers", icon: "cloud-snow"},
  86: { description: "Heavy snow showers", icon: "cloud-snow"},
  95: { description: "Thunderstorm", icon: "cloud-lightning"},
  96: { description: "Thunderstorm with hail", icon: "cloud-lightning"},
  99: { description: "Thunderstorm with heavy hail", icon: "cloud-lightning"}
}

const url = import.meta.env.VITE_WEATHER_API_BASE_URL
const GEOCODING_URL = import.meta.env.VITE_GEOCODING_API_BASE_URL

export async function searchLocations(query: string): Promise<GeocodingLocationItem[]> {
  if(!query.trim()) return []

  try {
    const response = await axios.get<GeocodingApiResponse>(`${GEOCODING_URL}/search`, {
      params: {
        name: query,
        count: 5,
        language: 'en',
        format: 'json'
      }
    })

    return response.data.results || []
  } catch (error) {
    if(error instanceof Error) {
      console.error("Error searching locations: ", error.message)
    } else {
      console.error("Error searching locations: ", error)
    }

    throw error
  }
}

export async function fetchWeather(latitude: number, longitude: number) {

  const params = {
    latitude,
    longitude,
    current: [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "wind_speed_10m",
      "precipitation",
      "weather_code",
      "is_day"
    ].join(","),
    hourly: ["temperature_2m", "weather_code"].join(","),
    daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"].join(","),
    timezone: "auto",
    forecast_days: 7,
  }

  try {
      const response = await axios.get<WeatherApiResponse>(`${url}/forecast`, { params })

      return response.data
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching weather Api: ", error.message)
    } else {
      console.error("Error fetching weather Api: ", error)
    }

    throw error
  }
}

