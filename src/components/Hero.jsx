import JobUpdate from "./JobUpdate";

const Hero = () => {
  return (
    <section className='w-full section bg-black flex py-20 mb-4'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center'>
        <div className='text-center'>
          <h2 className="text-4xl font-semibold text-white my-4 sm:text-5xl md:text-6xl text-center">
            You've honed your skills, now
          </h2>
          <h1 className='text-bl font-extrabold text-white sm:text-5xl md:text-6xl'>
            Find your Dream Job
          </h1>
          <br />
          <JobUpdate />
        </div>
      </div>
    </section>
  );
};

export default Hero;
