import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';

const Preloader = () => {
  const [pre, setpre] = useState('');
  const url = 'https://res.cloudinary.com/dusxlxlvm/raw/upload/v1718947937/battlefiesta/assets/loader2_cxkkhr.json'

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setpre(data))
      .catch(error => console.error('Error fetching animation:', error));
  }, [])
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: pre,
  };

  return (
    <div className='preloder'>
      <Lottie options={defaultOptions} height={250} width={250} />
    </div>
  );
};

export default Preloader;
