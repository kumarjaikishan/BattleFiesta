import React from 'react';
import Lottie from 'react-lottie';
import preloaderData from './assets/loader.json';

const Preloader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: preloaderData,
  };

  return (
    <div className='preloder'>
      <Lottie options={defaultOptions} height={250} width={250} />
    </div>
  );
};

export default Preloader;
