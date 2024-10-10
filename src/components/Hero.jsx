import React, { useEffect, useState } from "react";
import getJobs from "../services/JobServices"; // Adjust the import path as necessary

const Hero = () => {
  const [jobData, setJobData] = useState({
    totalJobs: 0,
    totalFullTime: 0,
    totalContract: 0,
  });

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const { totalJobs, totalFullTime, totalContract } = await getJobs();
        setJobData({ totalJobs, totalFullTime, totalContract });
      } catch (error) {
        console.error("Error loading jobs:", error);
      }
    };

    fetchJobData();
  }, []);

  return (
    <section className="section w-full bg-black flex py-20 mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-white">
            You've honed your skills, now
          </h2>
          <h1 className="text-bl font-extrabold text-white sm:text-5xl md:text-6xl">
            Find your Dream Job
          </h1>
          <br />
          <p className="my-4 text-xl text-white">
            <pre className="inline border border-gray-100 p-2">
              <code>{jobData.totalJobs}</code>
              <span className="blink">|</span>
            </pre>
            <pre className="inline">
              {jobData.totalJobs !== 1
                ? " Jobs opened today"
                : " Job opened today"}
            </pre>
          </p>
          <p className="my-4 text-xl text-white">
            <pre className="inline border border-gray-100 p-2">
              <code>{jobData.totalFullTime}</code>
              <span className="blink">_</span>
            </pre>
            <pre className="inline">
              {jobData.totalFullTime !== 1
                ? " Full-time roles"
                : " Full-time role"}
            </pre>
          </p>
          <p className="my-4 text-xl text-white">
            <pre className="inline border border-gray-100 p-2">
              <code>{jobData.totalContract}</code>
              <span className="blink">_</span>
            </pre>
            <pre className="inline">
              {jobData.totalContract !== 1
                ? " Contract roles"
                : " Contract role"}
            </pre>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
