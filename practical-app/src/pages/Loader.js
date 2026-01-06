import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import dogLoader from '../images/dogLoader.png';
import Logo from '../images/logo.svg';

const Loader = () => {

const navigate = useNavigate();
const location = useLocation();
const { url, standard } = location.state || {};

useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/results", {
        state: { url, standard }
      })
    }, 3000);

    return () => clearTimeout(timer);
}, [navigate, url, standard]);

  return (
    <div className='min-h-screen'>
      <div className=''></div>
      <div className='flex justify-center mb-24 mt-10'>
        <img src={Logo} alt="Loading..." className='w-[20%] object-contain' />
      </div>

      <div className='text-600 mb-6 text-sm flex justify-center font-bold'>
        We may take a few minutes to analyze web page for the accessibility issues
      </div>
        
        <div className='w-full max-w-[1210px] h-2 border-blue-600 rounded mx-auto'><div className='h-full w-full bg-blue-600 rounded'></div></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2-translate-y-1/2 '>
          <img src={dogLoader} alt="Dog Loader" className='h-52' />
        </div>
    </div>
  )
}

export default Loader