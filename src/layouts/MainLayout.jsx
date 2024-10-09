import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';


const MainLayout = () => {
  const location = useLocation();

  return (
    <>
    {!location.pathname.match(/signup\/developer|signup\/hirer/) && (
      <Navbar />
)}
      <Outlet />
      <ToastContainer />
    </>
  );
};
export default MainLayout;
