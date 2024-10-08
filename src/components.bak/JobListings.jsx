import { useState, useEffect } from "react";
import JobListing from "../components.bak/JobListing";
import Spinner from "../components.bak/Spinner";
import getJobs from "../services/JobServices";

const JobList = ({ isHome }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        console.log(data); // Verify the structure here
        setJobs(data.jobs || []); // Set jobs only if data.jobs exists
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <div>Error loading jobs: {error.message}</div>;

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Ensure we are only mapping over valid job data */}
          {jobs
            .filter((job) => job && job.id) // Only pass jobs that are defined and have an id
            .map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default JobList;
