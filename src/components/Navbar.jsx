import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import SignupButton from './SignupButton';
import NavBarLinks from './NavBarLinks';
import { useState } from 'react';

const Navbar = () => {
  const [ menuHidden, setMenuHidden ] = useState(true);

  function toggleMenuVisibility() {
    menuHidden
    ? setMenuHidden(false)
    : setMenuHidden(true);
  }

  const headLink = ({ isActive }) =>  // On large screens
    isActive
    ? 'font-extrabold bg-white text-black hover:bg-white hover:text-black rounded-md px-3 py-2'
    : 'font-semibold text-white hover:bg-white hover:text-black rounded-md px-3 py-2';

  const menuLink = ({ isActive }) =>  // On mobile screens ( small and medium screens )
    isActive
    ? 'text-xl font-extrabold bg-white text-black hover:bg-white hover:text-black rounded-md px-4 py-3'
    : 'text-xl font-semibold text-white hover:bg-white hover:text-black rounded-md px-4 py-3';

  return (
    <div className='w-full flex flex-col position-fixed z-idx z-idx+4'>
      <nav className='bg-b'>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
          <div className='flex h-20 items-center justify-between'>
            <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
              <NavLink className='flex flex-shrink-0 items-center mr-auto' to='/'>
                <img className='hidden md:block filter-invert h-10' src={logo} alt='Remotely' />
                <span className='text-gray-400 text-2xl ml-2'>
                  &lt;/&gt;
                </span>
              </NavLink>
              <div className='mx-auto'>
                <NavBarLinks
                  linkClass={headLink}
                  navbarClass='hidden lg:block flex space-x-2'
                />
              </div>
              <div className='flex items-center justify-between ml-auto'>
                <SignupButton />
              </div>
            </div>
            <button
              onClick={toggleMenuVisibility}
              className='md:hidden bg-transparent ml-4'
            >
              {
                menuHidden
                ? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="64" viewBox="0 0 64 64" fill='#fff'><path d="M10 52H54V56H10zM10 12H54V16H10zM10 32H54V36H10z"></path></svg>
                : <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 -960 960 960" fill="#fff"><path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z"/></svg>
              }
            </button>
          </div>
        </div>
      </nav>

      {/* For small and medium screens */}
      <nav
        className='lg:hidden bg-b border border-blue-300 p-5'
        hidden={menuHidden}
      >
        <div className='m-5'>
          <NavBarLinks
            linkClass={menuLink}
            navbarClass='flex flex-col space-y-5 gap-4'
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;