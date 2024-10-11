import { useState } from "react";
import JobUpdate from "./JobUpdate";
import { realTimeJobs } from "../services/RealTimeJobService";

const Hero = () => {
  return (
    <section className='section w-full bg-black flex py-20 mb-4'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center'>
        <div className='text-center'>
          <h2 className="text-4xl font-semibold text-white my-4">
            You've honed your skills, now
          </h2>
          <h1 className='text-bl font-extrabold text-white sm:text-5xl md:text-6xl'>
            Find your Dream Job
          </h1>
          <br />
          <JobUpdate
            jobs={realTimeJobs ? realTimeJobs.jobs : []}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
