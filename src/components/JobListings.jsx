import { useState, useEffect } from 'react'
import JobListing from './JobListing'
import JobFilters from './JobFilters'
import LoadSpinner from './LoadSpinner'
import getJobs from '../services/JobServices'

const JobListings = ({ isHome, userRole }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    jobType: "All",
    jobLevel: "All",
    timePosted: "All",
  });
  const [visibleJobsCount, setVisibleJobsCount] = useState(6); // Number of jobs to show initially

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data.jobs || []); // Assuming data.jobs contains your job listings
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Apply filters to jobs
  const filteredJobs = jobs.filter((job) => {
    return (
      job &&
      (filters.jobType === "All" || job.jobType.includes(filters.jobType)) &&
      (filters.jobLevel === "All" || job.jobLevel === filters.jobLevel) &&
      (filters.timePosted === "All" ||
        isWithinTimeRange(job.pubDate, filters.timePosted))
    );
  });

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleViewMore = () => {
    setVisibleJobsCount((prevCount) => prevCount + 6); // Increase the number of visible jobs
  };

  if (loading) return <LoadSpinner />
  if (error) return <div className="h-full w-full mt-8 text-center text-red-500">Error loading jobs: {error.message}</div>

  return (
    <section className='px-4 py-10 flex flex-col items-center'>
      <div className="container-xl lg:container mt-16">
        <h2 className="text-4xl font-bold text-black mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        {/* Add Job Button for Hirers Only */}
        {userRole === "hirer" && (
          <div className="text-center mb-4">
            <Link to="/add-job">
              <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
                Add Job
              </button>
            </Link>
          </div>
        )}

        <JobFilters filters={filters} onFilterChange={handleFilterChange} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 mx-2">
          {filteredJobs.slice(0, visibleJobsCount).map((job) => (
            <JobListing key={job.id} job={job} />
          ))}
        </div>

        {/* View More Jobs Button */}
        {visibleJobsCount < filteredJobs.length && (
          <div className="text-center mt-6">
            <button
              onClick={handleViewMore}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
            >
              View More Jobs
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

function isWithinTimeRange(dateString, range) {
  const now = new Date();
  const jobDate = new Date(dateString);
  const diff = now.getTime() - jobDate.getTime();
  const days = diff / (1000 * 3600 * 24);

  switch (range) {
    case "24h":
      return days <= 1;
    case "7d":
      return days <= 7;
    case "30d":
      return days <= 30;
    default:
      return true;
  }
}

export default JobListings;
