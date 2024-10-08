import { Link } from 'react-router-dom';
import Card from './Card';
import { devTypes } from '../utils';

const DevtypeCards = () => {
  return (
    <section className='section w-full flex flex-col py-4'>
      <div className='container-xl lg:container m-auto'>
        <div className='flex wrap justify-content items-align gap-4 p-4 rounded-lg'>
          {devTypes.map(
            ({ name, imgBase64 }) => (
              <Card style='flex justify-between'>
                <img src={imgBase64} alt={name} width='50px' />
                <div className='ml-2 flex flex-col justify-center items-center p-1'>
                  <h1 className='text-xl'>{name}</h1>
                  <small>127 jobs available</small>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
};
export default DevtypeCards;
