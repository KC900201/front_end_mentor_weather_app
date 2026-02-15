import { useEffect } from "react"

// Component imports
import {
  ErrorState,
  LoadingState,
  MetricsGrid,
  SearchBar,
} from "@/components/molecules"
import {
  CurrentWeatherCard,
  DailyForecast,
  Header,
  HourlyForecast,
} from "@/components/organisms"

// Hooks
import { useWeatherQuery } from "@/hooks/useWeather"
import { useWeatherStore } from "@/store/weatherStore"

// Default location for intial load
const DEFAULT_LOCATION = {
  name: "Berlin",
  country: "Germany",
  latitude: 52.52,
  longitude: 13.405,
}

/**
 * Homepage - page component for main weather app
 * @returns landing page for weather app
 */

const HomePage = () => {
  const selectedLocation = useWeatherStore((state) => state.selectedLocation)
  const setSelectedLocation = useWeatherStore(
    (state) => state.setSelectedLocation
  )

  // Set default location on first load if none selected
  useEffect(() => {
    if (!selectedLocation) {
      setSelectedLocation(DEFAULT_LOCATION)
    }
  }, [selectedLocation, setSelectedLocation])

  const {
    data: weather,
    isLoading,
    isError,
    refetch,
  } = useWeatherQuery(
    selectedLocation?.latitude || null,
    selectedLocation?.longitude || null
  )

  return (
    <main className="bg-background min-h-screen">
      <article className="container mx-auto max-w-6xl px-4 pb-10">
        <Header />

        {/* Hero section */}
        <section
          className="py-8 text-center md:py-12"
          aria-labelledby="hero-title"
        >
          <h1
            id="hero-title"
            className="text-foreground font-display mb-8 text-3xl font-bold md:text-5xl"
          >
            How's the sky looking today?
          </h1>
          <SearchBar />
        </section>

        {/* Weather content */}
        {isLoading ? (
          <LoadingState message="Fetching weather data..." />
        ) : isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : weather ? (
          <section className="space-y-6" aria-label="Weather information">
            {/* Main grid: Current weather + hourly */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <CurrentWeatherCard weather={weather} />
                {/* Metrics */}
                <MetricsGrid
                  feelsLike={weather.current.apparent_temperature}
                  humidity={weather.current.relative_humidity_2m}
                  windSpeed={weather.current.wind_speed_10m}
                  precipitation={weather.current.precipitation}
                />
              </div>
              <aside className="lg:col-span-1">
                <HourlyForecast weather={weather} />
              </aside>
            </div>

            {/* Daily forecast */}
            <DailyForecast weather={weather} />
          </section>
        ) : (
          <LoadingState message="Search for a location to see the weather" />
        )}
      </article>
    </main>
  )
}

export default HomePage
