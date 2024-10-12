import { NavLink } from "react-router-dom"

const NavBarLinks = (
  { linkClass, navbarClass }
) => {
  return (
    <div className={navbarClass}>
      <NavLink to='/jobs' className={linkClass}>
        Find a Job
      </NavLink>
      <NavLink to='/companies' className={linkClass}>
        Companies
      </NavLink>
      <NavLink to='/talents' className={linkClass}>
        Talents
      </NavLink>
      <NavLink to='/recruiters' className={linkClass}>
        Recruiters
      </NavLink>
    </div>
  );
}

export default NavBarLinks;