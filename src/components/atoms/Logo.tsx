import logo from "@/assets/logo.svg"

const Logo = () => {
  return (
    <a href="/" className="flex items-center">
      <img src={logo} alt="Weather now logo" className="h-8 md:h-10" />
    </a>
  )
}

export default Logo
