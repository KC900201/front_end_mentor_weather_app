import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect, useRef, useState } from "react"

import { useLocationSearch } from "@/hooks/useWeather"
import { type GeocodingLocationItem } from "@/lib/weatherApi"
import { useWeatherStore } from "@/store/weatherStore"

import iconLoading from "@/assets/images/icon-loading.svg"
import iconSearch from "@/assets/images/icon-search.svg"

/**
 * Combines input, dropdown and button with search functionality
 */

const SearchBar = () => {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLUListElement>(null)

  const { data: locations, isLoading, isFetched } = useLocationSearch(query)
  const setSelectedLocation = useWeatherStore(
    (state) => state.setSelectedLocation
  )

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Track when a search has been performed
  useEffect(() => {
    if (isFetched && query.length >= 2) {
      setHasSearched(true)
    }
  }, [isFetched, query])

  const handleSelect = (location: GeocodingLocationItem) => {
    setSelectedLocation({
      name: location.name,
      country: location.country,
      latitude: location.latitude,
      longitude: location.longitude,
    })
    setQuery("")
    setIsOpen(false)
    setHasSearched(false)
  }

  const handleSearch = () => {
    if (locations && locations.length > 0) {
      handleSelect(locations[0])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setQuery(value)
    setIsOpen(true)

    if (value.length < 2) {
      setHasSearched(false)
    }
  }

  const showNoResults =
    hasSearched &&
    !isLoading &&
    query.length >= 2 &&
    (!locations || locations?.length <= 0)

  return (
    <search className="mx-auto flex w-full max-w-xl flex-col gap-4">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault()
          handleSearch()
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <fieldset className="relative m-0 flex-1 border-0 p-0">
          {/* search icon and and input */}
          <img
            src={iconSearch}
            alt="search-icon"
            className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="search"
            className="search-input"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            placeholder="Search for a place..."
            aria-label="Search for a location"
          />

          <AnimatePresence>
            {isOpen && query.length >= 2 && (
              <motion.ul
                ref={dropdownRef}
                className="search-dropdown"
                role="listbox"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {isLoading ? (
                  <li className="text-muted-foreground flex items-center gap-3 px-4 py-3">
                    <motion.img
                      src={iconLoading}
                      alt="loading-icon"
                      className="h-4 w-4"
                      aria-hidden="true"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </li>
                ) : locations && locations.length > 0 ? (
                  locations.map((location, index) => (
                    <motion.li
                      key={location.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <button
                        type="button"
                        onClick={() => handleSelect(location)}
                        className="search-dropdown-item w-full text-left"
                        role="button"
                      >
                        {location.name}
                        {location.admin1 && `, ${location.admin1}`}
                        {location.country && `, ${location.country}`}
                      </button>
                    </motion.li>
                  ))
                ) : (
                  <li className="text-muted-foreground px-4 py-3">
                    No results found
                  </li>
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </fieldset>

        {/* Submit button */}
        <motion.button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-button focus:ring-primary focus:ring-offset-background rounded-xl px-6 py-3 font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Search
        </motion.button>
      </form>

      {/* No search result found message */}
      <AnimatePresence>
        {showNoResults && !isOpen && (
          <motion.output
            className="text-foreground block text-center text-lg font-semibold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            No search results found
          </motion.output>
        )}
      </AnimatePresence>
    </search>
  )
}

export default SearchBar
