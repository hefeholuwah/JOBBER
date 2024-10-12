import { Link } from 'react-router-dom';
import Card from './Card';
import { devTypes } from '../utils';
import { realTimeJobs } from '../services/RealTimeJobService';


const DevTypeCards = () => {

  return (
    <section className=' w-full flex flex-col items-center py-4 my-9'>
      <h1
        className='text-4xl font-bold my-8'
      >
        Browse by Tech Stack
      </h1>
      <div className='container-xl lg:container'>
        <div className='flex wrap justify-evenly items-align gap-6 p-4 rounded-lg'>
          {
          devTypes.map(
            ({ name, keyWords, imgBase64 }, index) => (
              <Link
                key={index}
                to={`/jobs?dev_type=${name.toLowerCase()}`}
              >
                <Card
                  style='flex justify-between card'
                  >
                  <img src={imgBase64} alt={name} width='50px' />
                  <div
                    className='ml-2 flex flex-col justify-center items-center p-1'
                    >
                    <h1 className='text-xl font-serif'>{name}</h1>
                    <small className='font-serif text-b'>{getDevJobsBykeyWords(keyWords).length} Jobs Available</small>
                  </div>
                </Card>
              </Link>
            )
          )
          }
        </div>
      </div>
    </section>
  );
};

const getDevJobsBykeyWords = (keyWords) => {
  let jobs = realTimeJobs ? realTimeJobs.jobs : null;
  return (
    jobs ? jobs.filter(

    ({ jobTitle }) => {

      let status = false;
      const title = jobTitle.toLowerCase();

      console.log(jobTitle);

      keyWords.forEach(keyWord => {
        if (!status && title.includes(keyWord)) {
          status = true;
        }
      });

      return status;
    }) : []
  );
}

export default DevTypeCards;
