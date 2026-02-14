import { motion } from "framer-motion"

import {
  formatPrecipitation,
  formatTemperature,
  formatWindSpeed,
} from "@/lib/unitConversion"
import { useWeatherStore } from "@/store/weatherStore"

interface MetricCardProps {
  label: string
  value: string
  index: number
}

interface MetricsGridProps {
  feelsLike: number
  humidity: number
  windSpeed: number
  precipitation: number
}

/**
 * returns a component that displays individual metric with animation
 * @param label, value, index
 */

const MetricCard = ({ label, value, index }: MetricCardProps) => {
  return (
    <motion.article
      className="metric-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary) /  0.3)" }}
    >
      <h4 className="text-muted-foreground text-sm">{label}</h4>
      <data className="text-foreground mt-2 block text-2xl font-semibold md:text-3xl">
        {value}
      </data>
    </motion.article>
  )
}

const MetricsGrid = ({
  feelsLike,
  humidity,
  windSpeed,
  precipitation,
}: MetricsGridProps) => {
  const { temperatureUnit, windSpeedUnit, precipitationUnit } =
    useWeatherStore()

  const metrics = [
    {
      label: "Feels Like",
      value: formatTemperature(feelsLike, temperatureUnit),
    },
    {
      label: "Humidity",
      value: `${humidity}`,
    },
    {
      label: "Wind",
      value: formatWindSpeed(windSpeed, windSpeedUnit),
    },
    {
      label: "Precipitation",
      value: formatPrecipitation(precipitation, precipitationUnit),
    },
  ]

  return (
    <section
      className="grid grid-cols-2 gap-3 md:grid-cols-4"
      aria-label="Weather metrics"
    >
      {metrics.map((metric, index) => (
        <MetricCard
          key={metric.label}
          label={metric.label}
          value={metric.value}
          index={index}
        />
      ))}
    </section>
  )
}

export default MetricsGrid
