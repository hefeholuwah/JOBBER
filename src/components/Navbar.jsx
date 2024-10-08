import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import SignupButton from './SignupButton';

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'font-extrabold bg-white text-black hover:bg-white hover:text-black rounded-md px-3 py-2'
      : 'font-semibold text-white hover:bg-white hover:text-black rounded-md px-3 py-2';

  return (
    <nav className='bg-b position-fixed w-full border-b border-indigo-500'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            <NavLink className='flex flex-shrink-0 items-center mr-4' to='/'>
              <img className='filter h-10 w-auto' src={logo} alt='Remotely' />
              <span className='hidden md:block text-white text-2xl ml-2'>
                &lt;/&gt;
              </span>
            </NavLink>
            <div className='mx-auto'>
              <div className='flex space-x-2'>
                <NavLink to='/jobs' className={linkClass}>
                  Find a Job
                </NavLink>
                <NavLink to='/companies' className={linkClass}>
                  Companies
                </NavLink>
                <NavLink to='/talents' className={linkClass}>
                  Talents
                </NavLink>
                <NavLink to='/employers' className={linkClass}>
                  Employers
                </NavLink>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <SignupButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;