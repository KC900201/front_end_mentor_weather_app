import { motion } from "framer-motion"

import iconError from "@/assets/images/icon-error.svg"
import iconRetry from "@/assets/images/icon-retry.svg"

interface ErrorStateProps {
  onRetry: () => void
  title?: string
  message?: string
}

/**
 * Component to display error messages
 * @param onRetry, title, message
 */

const ErrorState = ({
  onRetry,
  title = "Something went wrong",
  message = "Please try again later",
}: ErrorStateProps) => {
  return (
    <motion.section
      className="flex flex-col items-center justify-center py-20"
      role="alert"
      aria-live="polite"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.figure
        className="mb-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        <img src={iconError} alt="" className="h-16 w-16" aria-hidden="true" />
      </motion.figure>
      <h2 className="text-foreground font-display mb-3 text-3xl font-bold">
        {title}
      </h2>
      <p className="text-muted-foreground mb-6 max-w-md text-center">
        {message}
      </p>
      <motion.button
        onClick={onRetry}
        className="bg-secondary borde-border hover:bg-muted focus:ring-primary flex items-center gap-2 rounded-xl border px-5 py-3 focus:ring-2 focus:outline-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img src={iconRetry} aria-hidden="true" alt="" className="h-4 w-4" />
        <span>Retry</span>
      </motion.button>
    </motion.section>
  )
}

export default ErrorState
