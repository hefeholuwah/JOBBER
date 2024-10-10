import Hero from '../components/Hero';
import DevTypeCards from '../components/DevTypeCards';
import JobListings from '../components/JobListings';
import ViewAllJobs from '../components/ViewAllJobs';
import { updatePageTitle } from '../utils';

const HomePage = () => {
  updatePageTitle("REMOTELYDEV | Find your Dream Job");

  return (
    <>
      <Hero />
      <DevTypeCards />
      <JobListings isHome={true} />
      <ViewAllJobs />
    </>
  );
};
export default HomePage;
