import { fetchWeatherApi } from "openmeteo"

// demonstration on how to use openmeteo api - https://open-meteo.com/en/docs?latitude=3.1412&longitude=101.6865

export interface GeocodingResult {
  id: number
  name: string
  latitude: number
  longitude: number
  country: string
  country_code: string
  admin1?: string
}

export interface WeatherData {
  current: {
    temperature_2m: number
    apparent_temperature: number
    relative_humidiy_2m: number
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

const params = {
  latitude: 3.1412,
  longitude: 101.6865,
  hourly: "temperature_2m"
}

const url = import.meta.env.VITE_API_BASE_URL

const responses = await fetchWeatherApi(url, params)

// Process first location. Add a for-loop for multiple locations
const response = responses[0]

const latitude = response.latitude()
const longitude = response.longitude()
const elevation = response.elevation()
const utcOffsetSeconds = response.utcOffsetSeconds()

console.log(
  `\nCoordinates: ${latitude}°N ${longitude}°E`,
  `\nElevation: ${elevation}m asl`,
  `\nTimezone difference to GMT+0: ${utcOffsetSeconds}`,
)

const hourly = response.hourly()!

// The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
  hourly: {
    time: Array.from(
      { length: (Number(hourly?.timeEnd()) - Number(hourly?.time())) / hourly?.interval() },
      (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
    ),
    temperature_2m: hourly.variables(0)!.valuesArray(),
  }
}

// The weather object now contains a simple structure, with arrays of datetimes and weather information
console.log(`\nHourly data:\n`, weatherData.hourly)