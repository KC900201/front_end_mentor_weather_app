import { motion } from "framer-motion"

import { WeatherIcon } from "@/components/atoms"

import { formatDate, formatTemperature } from "@/lib/unitConversion"
import { useWeatherStore } from "@/store/weatherStore"

import bgTodayLarge from "@/assets/images/bg-today-large.svg"
import bgTodaySmall from "@/assets/images/bg-today-small.svg"
import type { WeatherApiResponse } from "@/lib/weatherApi"

interface CurrentWeatherCardProps {
  weather: WeatherApiResponse
}

/**
 * CurrentWeatherCard
 * @returns a complex weather card component with background image, location, date, weather icon and temperature
 */

const CurrentWeatherCard = ({ weather }: CurrentWeatherCardProps) => {
  const { selectedLocation, temperatureUnit } = useWeatherStore()

  if (!selectedLocation) return null

  const currentTemp = formatTemperature(
    weather.current.temperature_2m,
    temperatureUnit
  )
  const todayDate = formatDate(weather.daily.time[0])

  return (
    <motion.article
      className="relative flex min-h-55 flex-col justify-between overflow-hidden rounded-4xl md:min-h-71.5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background image - responsive */}
      <picture className="absolute inset-0 h-full w-full">
        <source media="(min-width: 768px)" srcSet={bgTodayLarge} />
        <img
          src={bgTodaySmall}
          alt="backgound-image"
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      </picture>

      {/* Content */}
      <figure className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
        {/* Location info */}
        <header>
          <motion.h2
            className="text-foreground font-display text-2xl font-bold md:text-3xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {selectedLocation.name}, {selectedLocation.country}
          </motion.h2>
          <motion.p
            className="text-foreground/70 mt-1 text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <time dateTime={weather.daily.time[0]}>{todayDate}</time>
          </motion.p>
        </header>

        {/* Temperature and icon */}
        <figcaption className="mt-auto flex items-end justify-between pt-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <WeatherIcon
              code={weather.current.weather_code}
              size={80}
              className="md:h-25 md:w-25"
            />
          </motion.div>
          <motion.data
            value={weather.current.temperature_2m}
            className="text-temperature-mobile md:text-temperature text-foreground tracking-light font-light"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {currentTemp}
          </motion.data>
        </figcaption>
      </figure>
    </motion.article>
  )
}

export default CurrentWeatherCard
