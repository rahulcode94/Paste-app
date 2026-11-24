import { NavLink } from 'react-router-dom'

const NavBar = () => {
  const linkClass = ({ isActive }) =>
    isActive ? 'font-bold text-blue-600' : 'text-gray-600'

  return (
    <div className="flex flex-row gap-4 place-content-evenly">
      <NavLink to="/" className={linkClass}>
        Home
      </NavLink>
      <NavLink to="/pastes" className={linkClass}>
        Pastes
      </NavLink>
    </div>
  )
}

export default NavBar