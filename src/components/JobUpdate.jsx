const JobUpdate = (
    { jobs }
) => {
  let totalJobCount = jobs.length;
  let todayJobCount = getTodayJobs(jobs).length;

  function getTodayJobs(jobs) {
    const today = new Date();
    return jobs.filter(
      ( { pubDate } ) => {
        const jobDate = new Date(pubDate);
        return jobDate.toLocaleDateString() === today.toLocaleDateString();
      }
    )
  }
  let totalInfo = totalJobCount != 1 ? "jobs are waiting for you" : "job is waiting for you";
  let todayInfo = `${todayJobCount} new jobs open today`, blinker = '_';

  if (todayJobCount === 0) {
    todayInfo = "There are no jobs currently open today";
    todayJobCount = ">";
    blinker = '';
  } else if (todayJobCount === 1) {
    todayInfo = `${todayJobCount} new job open today`;
  }
  
  if (jobs.length > 0)
  {
    return (
      <>
      <span
        className='my-4 text-xl text-white block'
      >
        <pre className="inline text-bl p-2">
          <code>{totalJobCount}</code><span className="blink">_</span>
        </pre>
        <pre className="inline text-gray-400">
          {totalInfo}
        </pre>
      </span>
      <span
        className='my-4 text-xl text-white block'
      >
        <pre className="inline text-bl p-2">
          <code>{todayJobCount}</code><span className="blink">{blinker}</span>
        </pre>
        <pre className="inline text-gray-400">
          {todayInfo}
        </pre>
      </span>
      </>
    )
  }

  else 
  {
    return (
      <>
      <pre className="text-gray-400">
        { "> We will let you know as soon as a new job arrives" }
      </pre>
      {/* <p className=" border border-blue-500 bg-white">
        It's likely you are having a bad internet connection
      </p> */}
      </>
    )
  }
}

export default JobUpdate;
