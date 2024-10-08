const Hero = ({
  getTodayJobCount,
  getTodayInternCount,
}) => {
  const todayJobCount = getTodayJobCount;
  const todayInternCount = getTodayInternCount;

  return (
    <section className='section w-full bg-b flex py-20 mb-4'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center'>
        <div className='text-center'>
          <h2 className="text-4xl text-white">
            You've honed your skills, now
          </h2>
          <h1 className='text-4xl font-extrabold text-white sm:text-5xl md:text-6xl'>
            Find your Dream Job
          </h1>
          <br />
          <p className='my-4 text-xl text-white'>
            <pre className="inline border border-gray-100 p-2">
              <code>{todayJobCount}</code><span className="blink">|</span>
            </pre>
            <pre className="inline">
              {todayJobCount !== 1 ? " Jobs opened today" : " Job opened today"}
            </pre>
          </p>
          <p className='my-4 text-xl text-white'>
            <pre className="inline border border-gray-100 p-2">
              <code>{todayInternCount}</code><span className="blink" >_</span>
            </pre>
            <pre className="inline">
              {todayInternCount != 1 ? " Internships roles" : " Internship"}
            </pre>
          </p>
        </div>
      </div>
    </section>
  );
};
export default Hero;
