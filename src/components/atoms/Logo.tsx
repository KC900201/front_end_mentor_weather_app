import { Link } from "react-router-dom"

import logo from "@/assets/images/logo.svg"

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img src={logo} alt="Weather now logo" className="h-8 md:h-10" />
    </Link>
  )
}

export default Logo
