// import navbar from '../components/Navbar';
import Hero from "../components/Hero";
import DevTypeCards from "../components/DevTypeCards";
import { updatePageTitle } from "../utils";

const HomePage = () => {
  updatePageTitle("REMOTELYDEV | Find your Dream Job");

  return (
    <>
      <Hero />
      <DevTypeCards />
    </>
  );
};
export default HomePage;
