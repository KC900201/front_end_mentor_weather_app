import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

import { WeatherIcon } from "@/components/atoms"

import {
  formatDayLong,
  formatHour,
  formatTemperature,
  isSameDay,
} from "@/lib/unitConversion"
import type { WeatherApiResponse } from "@/lib/weatherApi"
import { useWeatherStore } from "@/store/weatherStore"

import iconDropdown from "@/assets/images/icon-dropdown.svg"

interface HourlyForecastProps {
  weather: WeatherApiResponse
}

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
}

/**
 * Complex card with day selector dropdown and hourly weather list
 */

const HourlyForecast = ({ weather }: HourlyForecastProps) => {
  const { temperatureUnit } = useWeatherStore()
  const [selectedDayIndex, setSelectedDayIndex] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const days = weather.daily.time

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Filter hourly data for selected day
  const selectedDay = days[selectedDayIndex]
  const hourlyData = weather.hourly.time
    .map((time, index) => ({
      time,
      temperature: weather.hourly.temperature_2m[index],
      weatherCode: weather.hourly.weather_code[index],
    }))
    .filter((item) => isSameDay(item.time, selectedDay))
    .filter((item) => {
      const hour = new Date(item.time).getHours()

      // Show from current hour for today, or from morning for other days
      return selectedDayIndex === 0
        ? hour >= new Date().getHours()
        : hour >= 6 && hour <= 22
    })
    .slice(0, 8)

  return (
    <motion.section
      className="bg-card border-border rounded-2xl border p-4 md:p-6"
      aria-labelledby="hourly-forecast-title"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <header className="mb-4 flex items-center justify-between">
        <h3
          id="hourly-forecast-title"
          className="text-foreground text-lg font-semibold"
        >
          Hourly forecast
        </h3>

        {/* Day selector dropdown */}
        <nav className="relative" ref={dropdownRef} aria-label="Day selection">
          <button
            className="bg-secondary border-border hover:bg-muted flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
          >
            <span>{formatDayLong(selectedDay)}</span>
            <motion.img
              src={iconDropdown}
              alt="dropdown-icon"
              className="h-2 w-3"
              aria-hidden="true"
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.menu
                role="listbox"
                className="bg-popover border-border absolute top-full right-0 z-50 m-0 mt-2 min-w-35 overflow-hidden rounded-xl border p-0 shadow-lg"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {days.map((day, index) => (
                  <li key={`day-${day}`}>
                    <button
                      onClick={() => {
                        setSelectedDayIndex(index)
                        setIsDropdownOpen(false)
                      }}
                      className="hover:bg-muted w-full px-4 py-2.5 text-left text-sm transition-colors"
                      role="option"
                      aria-selected={index === selectedDayIndex}
                    >
                      {formatDayLong(day)}
                    </button>
                  </li>
                ))}
              </motion.menu>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Hourly items */}
      <motion.ul
        className="space-y-1"
        variants={listVariants}
        initial="hidden"
        animate="visible"
        key={selectedDayIndex}
      >
        {hourlyData.map((item) => (
          <motion.li
            key={item.time}
            className="hourly-item"
            variants={itemVariants}
            whileHover={{ backgroundColor: "hsl(var(--muted) / 0.5)" }}
          >
            <div className="flex items-center gap-3">
              <WeatherIcon code={item.weatherCode} size={32} />
              <span className="text-foreground">
                <time dateTime={item.time}>{formatHour(item.time)}</time>
              </span>
            </div>
            <span className="text-foreground font-medium">
              {formatTemperature(item.temperature, temperatureUnit)}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  )
}

export default HourlyForecast
