// import navbar from '../components/Navbar';
import Hero from "../components/Hero";
import DevTypeCards from "../components/DevTypeCards";
import JobListings from "../components/JobListings";
import { updatePageTitle } from "../utils";

const HomePage = () => {
  updatePageTitle("REMOTELYDEV | Find your Dream Job");

  return (
    <>
      <Hero />
      <DevTypeCards />
      <JobListings isHome={true} />
    </>
  );
};
export default HomePage;
