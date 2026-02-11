import { motion } from "framer-motion"

import { WeatherIcon } from "@/components/atoms"

import {
  formatDayLong,
  formatDayShort,
  formatTemperature,
} from "@/lib/unitConversion"
import type { WeatherApiResponse } from "@/lib/weatherApi"
import { useWeatherStore } from "@/store/weatherStore"

interface DailyForecastProps {
  weather: WeatherApiResponse
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

/**
 * DailyForecast - organism component for 7-day weather forecast
 * @returns grid of forecast cards showing daily weather predictions
 */

const DailyForecast = ({ weather }: DailyForecastProps) => {
  const { temperatureUnit } = useWeatherStore()

  return (
    <section aria-labelledby="daily-forecast-title">
      <h3
        className="text-foreground mb-4 text-lg font-semibold"
        id="daily-forecast-title"
      >
        Daily forecast
      </h3>
      <motion.div
        className="grid grid-cols-3 gap-3 md:grid-cols-7"
        initial="hidden"
        animate="visible"
      >
        {weather.daily.time.map((date: any, index: number) => (
          <motion.article
            key={`weather-${date}`}
            className="forecast-card"
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              borderColor: "hsl(var(--primary) / 0.3)",
            }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-foreground text-sm font-medium">
              {formatDayShort(date)}
            </span>
            <WeatherIcon code={weather.daily.weather_code[index]} size={48} />
            <div className="flex gap-2 text-sm">
              <span className="text-foreground font-medium">
                {formatTemperature(
                  weather.daily.temperature_2m_max[index],
                  temperatureUnit
                )}
              </span>
              <span className="text-muted-foreground">
                {formatTemperature(
                  weather.daily.temperature_2m_min[index],
                  temperatureUnit
                )}
              </span>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

export default DailyForecast
