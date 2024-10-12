import { Link } from 'react-router-dom';
import Card from './Card';
import { devTypes } from '../utils';
import getRealTimeJobs from '../services/RealTimeJobService';
import { useEffect, useState } from 'react';


const DevTypeCards = () => {
  const [ jobs, setJobs ] = useState([]);

  useEffect(
    () => {
      setJobs(getRealTimeJobs().jobs);
    }, []
  );

  const getDevJobsBykeyWords = (keyWords) => {
    return (
      jobs.filter(
  
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
      })
    );
  }

  return (
    <section className='w-full flex flex-col items-center py-4 my-9 z-idx'>
      <h1
        className='text-3xl font-bold my-8 text-center'
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
                  style='flex justify-between card z-idx'
                  >
                  <img src={imgBase64} alt={name} width='50px' className='bg-bl-2 rounded-md' />
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

export default DevTypeCards;
