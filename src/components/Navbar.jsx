
import React, { useState, useEffect, useRef } from "react"; 
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import SignupButton from "./SignupButton";
import LoginButton from "./LoginButton";

import {
  auth,
  onAuthStateChanged,
  signOut,
  db,
  ref,
  onValue,
} from "../firebase/firebase";
import NavBarLinks from "./NavBarLinks";
import { generateAvatarUrl } from "../utils";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menuHidden, setMenuHidden] = useState(true);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  function toggleMenuVisibility() {
    setMenuHidden((prev) => !prev);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
   
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        const userRef = ref(db, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setUserType(data.userType);
          }
        });
      } else {
        setCurrentUser(null);
        setUserType(null);
      }
    });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      unsubscribe();
    };
  }, []);

  const headLink = ({ isActive }) =>
    isActive
      ? "font-extrabold bg-white text-black hover:bg-white hover:text-black rounded-md px-3 py-2"
      : "font-semibold text-white hover:bg-white hover:text-black rounded-md px-3 py-2";

  const menuLink = ({ isActive }) =>
    isActive
      ? "text-xl font-extrabold bg-white text-black hover:bg-white hover:text-black rounded-md px-4 py-3"
      : "text-xl font-semibold text-white hover:bg-white hover:text-black rounded-md px-4 py-3";

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleProtectedLinkClick = (e, path) => {
    if (!currentUser) {
      e.preventDefault(); // Prevent default navigation
      navigate("/login"); // Redirect to login
    }
  };

  return (
    <div className="w-full flex flex-col position-fixed z-idx z-idx+4">
      <nav className="bg-b">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
              <NavLink
                className="flex flex-shrink-0 items-center mr-auto"
                to="/"
              >
                <img
                  className="hidden md:block filter-invert h-10"
                  src={logo}
                  alt="Remotely"
                />
                <span className="text-gray-400 text-2xl ml-2">&lt;/&gt;</span>
              </NavLink>
              <div className="mx-auto">
                <NavBarLinks
                  linkClass={headLink}
                  navbarClass="hidden lg:block flex space-x-2"
                  onProtectedLinkClick={handleProtectedLinkClick} // Pass the click handler
                />
              </div>

              {currentUser ? (
                <div className="relative flex items-center justify-between">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 overflow-hidden"
                  >  
                      {/* Replace SVG icons with avatar image */ }
                      < img
                      
                      src={generateAvatarUrl(currentUser.displayName || 'User')}
                    alt={currentUser.displayName || 'User'}
                    className="w-full h-full object-cover"
                    />
            
                  </button>
                  {isDropdownOpen && (
                    <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mr-6">
                    <LoginButton />
                  </div>
                  <div className="flex items-center justify-between">
                    <SignupButton />
                  </div>
                </>
              )}
            </div>
            <button
              onClick={toggleMenuVisibility}
              className="md:hidden bg-transparent ml-4"
            >
              {menuHidden ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="#fff"
                >
                  <path d="M10 52H54V56H10zM10 12H54V16H10zM10 32H54V36H10z"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30px"
                  height="30px"
                  viewBox="0 -960 960 960"
                  fill="#fff"
                >
                  <path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* For small and medium screens */}
      <nav
        className="lg:hidden bg-b border border-blue-300 p-5"
        hidden={menuHidden}
      >
        <div className="m-5">
          <NavBarLinks
            linkClass={menuLink}
            navbarClass="flex flex-col space-y-5 gap-4"
            onProtectedLinkClick={handleProtectedLinkClick} // Pass the click handler
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
