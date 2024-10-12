import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase"; // Import Firebase auth

const NavBarLinks = ({ linkClass, navbarClass }) => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const currentUser = auth.currentUser; // Check if a user is authenticated

  const handleProtectedLinkClick = (e, path) => {
    if (!currentUser) {
      e.preventDefault(); // Prevent the link from navigating
      navigate("/login"); // Redirect unauthenticated users to login page
    }
  };

  return (
    <div className={navbarClass}>
      {/* Example of links that will require authentication */}
      <NavLink
        to="/jobs"
        className={linkClass}
        onClick={(e) => handleProtectedLinkClick(e, "/jobs")}
      >
        Find a Job
      </NavLink>
      <NavLink
        to="/companies"
        className={linkClass}
        onClick={(e) => handleProtectedLinkClick(e, "/companies")}
      >
        Companies
      </NavLink>
      <NavLink
        to="/talents"
        className={linkClass}
        onClick={(e) => handleProtectedLinkClick(e, "/talents")}
      >
        Talents
      </NavLink>
      <NavLink
        to="/employers"
        className={linkClass}
        onClick={(e) => handleProtectedLinkClick(e, "/employers")}
      >
        Employers
      </NavLink>
    </div>
  );
};

export default NavBarLinks;
