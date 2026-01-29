import { motion } from "framer-motion"

import { Skeleton } from "@/components/atoms"

interface LoadingStateProps {
  message?: string
}

const LoadingState = ({ message = "Loading..." }: LoadingStateProps) => {
  return (
    <motion.section
      className="space-y-6"
      aria-busy="true"
      aria-label="Loading weather data"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Main weather card skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <article className="lg:col-span-2">
          <figure className="bg-card border-border flex min-h-55 flex-col items-center justify-center rounded-2xl border p-8">
            <span className="mb-4 flex gap-2" role="status">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="bg-muted-foreground/60 h-3 w-3 rounded-full"
                  animate={{ scale: [0, 1, 0] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    delay: i * 0.16,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </span>
            <p className="text-muted-foreground">{message}</p>
          </figure>
        </article>
        {/* Hourly forecase skeleton */}
        <aside className="bg-card border-border rounded-2xl border p-6">
          <header className="mb-4 flex items-center justify-between">
            <span className="text-foreground text-lg font-semibold">
              Hourly forecast
            </span>
            <Skeleton className="h-9 w-16 rounded-lg" />
          </header>
          <ul className="space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <li key={i}>
                <Skeleton className="h-12 w-full rounded-lg" />
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* Metrics skeleton */}
      <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-4">
        {["Feels Like", "Humidity", "Wind", "Precipitation"].map((label) => (
          <li className="metric-card" key={label}>
            <p className="text-muted-foreground text-sm">{label}</p>
            <p className="text-muted-foreground mt-2 text-2xl">-</p>
          </li>
        ))}
      </ul>

      {/* Daily forecast skeleton */}
      <section aria-labelledby="daily-skeletion-title">
        <h3
          className="text-foreground mb-4 text-lg font-semibold"
          id="daily-skeleton-title"
        >
          Daily forecast
        </h3>
        <ul className="m-0 grid list-none grid-cols-3 gap-3 p-0 md:grid-cols-7">
          {Array.from({ length: 7 }).map((_, i) => (
            <li key={i}>
              <Skeleton className="h-28 w-full rounded-xl" />
            </li>
          ))}
        </ul>
      </section>
    </motion.section>
  )
}

export default LoadingState
