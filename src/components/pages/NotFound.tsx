import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const NotFound = () => {
  const location = useLocation()

  useEffect(() => {
    console.error("Page does not exist: ", location.pathname)
  }, [location.pathname])

  return (
    <article className="bg-muted flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="text-muted-foreground mb-4 text-xl">Page not found</p>
        <a href="/" className="hover:text-primary/90 text-primary underline">
          Return to Home
        </a>
      </div>
    </article>
  )
}

export default NotFound
