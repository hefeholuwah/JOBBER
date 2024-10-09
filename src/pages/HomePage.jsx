// import navbar from '../components/Navbar';
import Hero from '../components/Hero';
import DevtypeCards from '../components/DevtypeCards';
import JobListings from '../components/JobListings';
import ViewAllJobs from '../components/ViewAllJobs';
import { updatePageTitle } from '../utils';

const HomePage = () => {
  updatePageTitle("REMOTELYDEV | Find your Dream Job");

  return (
    <>
    
      <Hero />
      <DevtypeCards />
      <JobListings isHome={true} />
      <ViewAllJobs />
    </>
  );
};
export default HomePage;
