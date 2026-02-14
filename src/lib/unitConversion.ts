
export function celsiusToFahrenheit(celsius: number) {
  return Math.round((celsius * 9) / 5 + 32)
}

export function formatTemperature(celsius: number, unit: 'celsius' | 'fahrenheit') {
  return unit === 'fahrenheit' ? `${celsiusToFahrenheit(celsius)}°` : `${Math.round(celsius)}°`
}

export function kmhToMph(kmh: number) {
  return Math.round(kmh * 0.621371)
}

export function formatWindSpeed(kmh: number, unit: 'kmh' | 'mph') {
  return unit === 'kmh' ?  `${Math.round(kmh)} km/h` : `${kmhToMph(kmh)} mph`
}

export function mmToInch(mm: number) {
  return Math.round(mm * 0.0393701 * 10) /10
}

export function formatPrecipitation(mm: number, unit: 'mm' | 'inch') {
  return unit === 'inch' ? `${mmToInch(mm)} in` : `${Math.round(mm)}`
}

export function formatDate(dateString: string) {
  const date = new Date(dateString)

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export function formatDayShort(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', { weekday: 'short' })
}

export function formatDayLong(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', { weekday: 'long' })
}

export function formatHour(isoString: string) {
  return new Date(isoString).toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true
  })
}

export function isSameDay(date1: string, date2: string) {
  return date1.split('T')[0] === date2.split('T')[0]
}

export function getTodayDateString() {
  return new Date().toISOString().split('T')[0]
}