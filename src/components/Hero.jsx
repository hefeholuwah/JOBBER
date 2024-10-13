import JobUpdate from "./JobUpdate";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className='w-full section bg-black flex py-20 mb-4'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center'>
        <div className='text-center'>
          <h2 className="font-semibold text-xl text-white my-4 sm:text-4xl md:text-5xl text-center">
            You've honed your skills, now
          </h2>
          <h1 className="text-2xl text-bl font-extrabold text-white sm:text-5xl md:text-6xl">
            Find your Dream Job
          </h1>
          <br />
          <JobUpdate />
        </div>
        <Link
          to='/jobs'
        >
          <button className="text-xl text-black bg-blue-400 hover:bg-indigo-500 font-bold mt-9 py-3 px-12 rounded-full">
            Check them out!
            <svg className="inline" xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="40px" fill="#000"><path d="M246.67-244 200-290.67l402.67-402.66H236V-760h480v480h-66.67v-366.67L246.67-244Z"/></svg>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
