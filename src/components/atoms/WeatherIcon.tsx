import iconDrizzle from "@/assets/images/icon-drizzle.webp"
import iconFog from "@/assets/images/icon-fog.webp"
import iconOvercast from "@/assets/images/icon-overcast.webp"
import iconPartlyCloudy from "@/assets/images/icon-partly-cloudy.webp"
import iconRain from "@/assets/images/icon-rain.webp"
import iconSnow from "@/assets/images/icon-snow.webp"
import iconStorm from "@/assets/images/icon-storm.webp"
import iconSunny from "@/assets/images/icon-sunny.webp"

export interface WeatherIconProps {
  code: number
  className?: string
  size?: number
}

function getWeatherIcon(code: number) {
  if (code === 0 || code === 1) {
    return iconSunny
  }

  if (code === 2) {
    return iconPartlyCloudy
  }

  if (code === 3) {
    return iconOvercast
  }

  if (code === 45 || code === 48) {
    return iconFog
  }

  if (code >= 51 || code <= 55) {
    return iconDrizzle
  }

  if ((code >= 61 && code <= 67) || (code >= 88 && code <= 82)) {
    return iconRain
  }

  if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
    return iconSnow
  }

  if (code >= 95 && code <= 99) {
    return iconStorm
  }

  return iconOvercast
}

const WeatherIcon = ({ code, className = "", size = 48 }: WeatherIconProps) => {
  const icon = getWeatherIcon(code)

  return (
    <img
      src={icon}
      alt="weather icon"
      className={`object-contain ${className}`}
      width={size}
      height={size}
      loading="lazy"
    />
  )
}

export default WeatherIcon
