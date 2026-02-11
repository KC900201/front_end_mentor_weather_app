import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

import { useWeatherStore } from "@/store/weatherStore"

import iconCheckmark from "@/assets/images/icon-checkmark.svg"
import iconDropDown from "@/assets/images/icon-dropdown.svg"
import iconUnits from "@/assets/images/icon-units.svg"

/**
 *
 * @returns dropdown with multiple sections for temperature, wind and precipitation units
 */

const UnitsDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const {
    temperatureUnit,
    windSpeedUnit,
    precipitationUnit,
    setTemperatureUnit,
    setWindSpeedUnit,
    setPrecipitationUnit,
    switchToImperial,
    switchToMetric,
    isImperial,
  } = useWeatherStore()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const imperial = isImperial()

  return (
    <nav className="relative" ref={dropdownRef} aria-label="Unit settings">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-secondary border-border hover:bg-muted focs:ring-2 focus:ring-primary flex items-center gap-2 rounded-lg border px-4 py-2.5 transition-colors focus:outline-none"
        aria-haspopup
        aria-expanded={isOpen}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <img
          src={iconUnits}
          alt="icon-units"
          className="h-4 w-4"
          aria-hidden="true"
        />
        <span className="text-sm font-medium">Units</span>
        <motion.img
          src={iconDropDown}
          alt=""
          className="h-2 w-3"
          aria-hidden="true"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.button>

      {/* menu dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.menu
            role="menu"
            className="units-dropdown absolute top-full right-0 z-50 mt-2"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Quick toggle */}
            <li>
              <button
                onClick={() => {
                  return imperial ? switchToMetric() : switchToImperial()
                }}
                className="units-dropdown-header w-full text-left"
                role="menuitem"
              >
                Switch to {imperial ? "Metric" : "Imperial"}
              </button>
            </li>

            {/* Temperature */}
            <li className="border-border border-t">
              <span className="units-dropdown-label mt-2">Temperature</span>
              <button
                onClick={() => setTemperatureUnit("celsius")}
                className="units-dropdown-item w-full"
                role="menuitemradio"
                aria-checked={temperatureUnit === "celsius"}
              >
                <span>Celsius (° C)</span>
                {temperatureUnit === "celsius" && (
                  <img
                    src={iconCheckmark}
                    alt="Selected"
                    className="h-3 w-3.5"
                  />
                )}
              </button>
              <button
                onClick={() => setTemperatureUnit("fahrenheit")}
                className="units-dropdown-item w-full"
                role="menuitemradio"
                aria-checked={temperatureUnit === "fahrenheit"}
              >
                <span>Fahrenheit (°F)</span>
                {temperatureUnit === "fahrenheit" && (
                  <img
                    src={iconCheckmark}
                    alt="Selected"
                    className="h-3 w-3.5"
                  />
                )}
              </button>
            </li>

            {/* Wind Speed */}
            <li className="border-border border-t">
              <span className="units-dropdown-label mt-2">Wind Speed</span>
              <button
                onClick={() => setWindSpeedUnit("kmh")}
                role="menuitemradio"
                aria-checked={windSpeedUnit === "kmh"}
                className="units-dropdown-item w-full"
              >
                <span>km/h</span>
                {windSpeedUnit === "kmh" && (
                  <img
                    src={iconCheckmark}
                    alt="Selected"
                    className="h-3 w-3.5"
                  />
                )}
              </button>
              <button
                onClick={() => setWindSpeedUnit("mph")}
                role="menuitemradio"
                aria-checked={windSpeedUnit === "mph"}
                className="units-dropdown-item w-full"
              >
                <span>mph</span>
                {windSpeedUnit === "mph" && (
                  <img
                    src={iconCheckmark}
                    alt="Selected"
                    className="h-3 w-3.5"
                  />
                )}
              </button>
            </li>

            {/* Precipitation */}
            <li className="border-border border-t pb-2">
              <span className="units-dropdown-label mt-2">Precipitation</span>
              <button
                onClick={() => setPrecipitationUnit("mm")}
                className="units-dropdown-item w-full"
                role="menuitemradio"
                aria-checked={precipitationUnit === "mm"}
              >
                <span>Millimeters (mm)</span>
                {precipitationUnit === "mm" && (
                  <img
                    src={iconCheckmark}
                    alt="Selectd"
                    className="h-3 w-3.5"
                  />
                )}
              </button>
              <button
                onClick={() => setPrecipitationUnit("inch")}
                className="units-dropdown-item w-full"
                role="menuitemradio"
                aria-checked={precipitationUnit === "inch"}
              >
                <span>Inches (in)</span>
                {precipitationUnit === "inch" && (
                  <img
                    src={iconCheckmark}
                    alt="Selectd"
                    className="h-3 w-3.5"
                  />
                )}
              </button>
            </li>
          </motion.menu>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default UnitsDropdown
