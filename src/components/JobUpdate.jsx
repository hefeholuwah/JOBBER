import { useEffect, useState } from "react";
import getRealTimeJobs from "../services/RealTimeJobService";

const JobUpdate = () => {
  const [ jobs, setJobs ] = useState([]);
  const [ todayJobs, setTodayJobs ] = useState([]);

  useEffect(
    () => {
      setJobs(getRealTimeJobs().jobs);
      setTodayJobs(getTodayJobs(jobs));
    }, []
  );

  function getTodayJobs(jobs) {
    const today = new Date();
    return jobs.filter(
      ( { pubDate } ) => {
        const jobDate = new Date(pubDate);
        return jobDate.toLocaleDateString() === today.toLocaleDateString();
      }
    )
  }

  let totalInfo = jobs.length != 1 ? "jobs are waiting for you" : "job is waiting for you";
  let todayInfo = todayJobs.length != 1 ? 'new jobs open today' : 'new job open today';
  todayInfo = todayJobs.length < 1 ? "There are no jobs currently open today" : todayInfo;

  return (
    <>
    <span
      className='my-4 text-xl text-white block'
    >
      <pre className="inline text-bl p-2">
        <code>{jobs.length}</code><span className="blink">_</span>
      </pre>
      <pre className="inline text-gray-400 text-center">
        {totalInfo}
      </pre>
    </span>
    <span
      className='my-4 text-xl text-white block'
    >
      <pre className="inline text-bl p-2">
        <code>{
          todayJobs.length === 0
          ? ''
          : todayJobs.length
        }
        </code>
        <span className="blink">{
          todayJobs.length === 0
          ? '>'
          : '_'
        }
        </span>
      </pre>
      <pre className="inline text-gray-400 text-center">
        {todayInfo}
      </pre>
    </span>
    </>
  )
}

export default JobUpdate;
