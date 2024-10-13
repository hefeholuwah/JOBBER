import { useEffect, useState } from "react";
import getJobs from "../services/JobServices";
import LoadSpinner from "./LoadSpinner";

const JobUpdate = () => {
  const [ jobs, setJobs ] = useState([]);
  // const [ todayJobs, setTodayJobs ] = useState([]);
  const [ loading, setLoading ] = useState(true);


  useEffect(() => {
    setLoading(true);

    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data.jobs);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  const getTodayJobs = (jobData) => {
    // Extract jobs posted today
    return jobData.filter(
      ({ pubDate }) => {
        const today = Math.floor(new Date().getTime() / (1000 * 3600 * 24));
        const jobDate = Math.floor(new Date(pubDate).getTime() / (1000 * 3600 * 24));
        return jobDate === today;
      }
    )
  }

  if (loading) return <LoadSpinner />
  return (
    <>
    <span
      className='my-4 text-xl text-white block'
    >
      <pre className="inline text-bl p-2">
        <code>{jobs.length}</code><span className="blink">_</span>
      </pre>
      <pre className="inline text-gray-400 text-center">jobs are waiting for you</pre>
    </span>
    <span
      className='my-4 text-xl text-white block'
    >
      <pre className="inline text-bl p-2">
        <code>{getTodayJobs(jobs).length}</code>
        <span className="blink">_</span>
      </pre>
      <pre className="inline text-gray-400 text-center">new jobs open today</pre>
    </span>
    </>
  )
}

export default JobUpdate;
