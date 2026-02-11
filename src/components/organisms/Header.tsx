import { Logo } from "@/components/atoms"
import UnitsDropdown from "./UnitsDropdown"

/**
 * Header
 * @returns logo and units dropdown molecules
 */

const Header = () => {
  return (
    <header className="flex items-center justify-between py-4">
      <Logo />
      <UnitsDropdown />
    </header>
  )
}

export default Header
