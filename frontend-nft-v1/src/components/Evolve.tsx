import React from 'react';
import Sidebar from './Sidebar';
import Cards from './Cards';

const Evolve:React.FC = () => {
  return (
  <div className='flex flex-row h-full'>
    <Sidebar/>
    <Cards/>
  </div>
  );
}

export default Evolve;
