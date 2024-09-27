import React, { useEffect, useState } from 'react';
import Lottie from "lottie-react";

const Preloader = () => {
  const [pre, setpre] = useState('');
  const url = 'https://res.cloudinary.com/dusxlxlvm/raw/upload/v1718947937/battlefiesta/assets/loader2_cxkkhr.json'

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setpre(data))
      .catch(error => console.error('Error fetching animation:', error));
  }, [])

  return (
    <div className='preloder'>
      <div className="conatneer">
        <Lottie animationData={pre} loop={true} autoPlay={true} />
      </div>
    </div>
  );
};

export default Preloader;
