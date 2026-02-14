import { create } from "zustand"
import { persist } from "zustand/middleware"

export type TemperatureUnit = "celsius" | 'fahrenheit'
export type WindSpeedUnit = "kmh" | "mph"
export type PrecipitationUnit = "mm" | "inch"

interface WeatherState {
  temperatureUnit: TemperatureUnit
  windSpeedUnit: WindSpeedUnit
  precipitationUnit: PrecipitationUnit
  selectedLocation: {
    name: string
    country: string
    latitude: number
    longitude: number
  } | null
  selectedDay: string
  setTemperatureUnit: (unit: TemperatureUnit) => void
  setWindSpeedUnit: (unit: WindSpeedUnit) => void
  setPrecipitationUnit: (unit: PrecipitationUnit) => void
  setSelectedLocation: (location: WeatherState['selectedLocation']) => void
  setSelectedDay: (day: string) => void
  switchToImperial: () => void
  switchToMetric: () => void
  isImperial: () => boolean
}

export const useWeatherStore = create<WeatherState>() (
  persist(
    (set, get) => ({
      temperatureUnit: 'celsius',
      windSpeedUnit: "kmh",
      precipitationUnit: "mm",
      selectedLocation: null,
      selectedDay: '',
      setTemperatureUnit: (unit) => set({ temperatureUnit: unit }),
      setWindSpeedUnit: (unit) => set({ windSpeedUnit: unit }),
      setPrecipitationUnit: (unit) => set({ precipitationUnit: unit }),
      setSelectedLocation: (location) => set({ selectedLocation: location }),
      setSelectedDay: (day) => set({ selectedDay: day}),
      switchToImperial: () =>
        set({
          temperatureUnit: 'fahrenheit',
          windSpeedUnit: 'mph',
          precipitationUnit: 'inch',
        }),
      switchToMetric: () =>
        set({
          temperatureUnit: 'celsius',
          windSpeedUnit: 'kmh',
          precipitationUnit: 'mm'
        }),
        isImperial: () => {
          const state = get()
          return (
            state.temperatureUnit === 'fahrenheit' &&
            state.windSpeedUnit === 'mph' &&
            state.precipitationUnit === 'inch'
          )
        }
    }),
    {
      name: 'weather-settings'
    }
  )
)