import { useQuery } from "@tanstack/react-query"

import { fetchWeather, searchLocations } from "@/lib/weatherApi"

export function useWeatherQuery(latitude: number | null, longitude: number | null) {
  return useQuery({
    queryKey: ['weather', latitude, longitude],
    queryFn: () => {
      if (latitude === null || longitude === null) {
        throw new Error('Location not selected')
      }

      return fetchWeather(latitude, longitude)
    },
    enabled: latitude !== null && longitude !== null,
    staleTime: 3 * 60 * 1000, // 3 minutes
    retry: 3
  })
}

export function useLocationSearch(query: string) {
  return useQuery({
    queryKey: ['locationSearch', query],
    queryFn: () => searchLocations(query),
    enabled: query.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}