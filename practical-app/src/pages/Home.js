import React, { useState } from 'react';
import LeftPanel from '../../src/images/leftPanel.svg';
import Logo from '../../src/images/logo.svg';
import { useNavigate } from 'react-router-dom';
import bgImage from '../images/bgImage.png';

const Home = () => {

  const [url, setUrl] = useState('');
  const [standard, setStandard] = useState('WCAG 2.0, 2.1 & 2.2');
  const navigate = useNavigate();

  const handleScan = () => {
    if(!url){
      alert('Please enter a website URL to scan.');
      return
    }
    navigate("/loader", {
      state: { url, standard }
    })
  }

  return (
    <div className='min-h-screen flex flex-col bg-white '>
      <div className='flex-1 grid grid-cols-1 lg:grid-cols-2'>
        {/* Left Panel */}
        <div className='hidden lg:flex items-center justify-center bg-cover bg-center' style={{backgroundImage: `url(${bgImage})`}}>
          <img src={LeftPanel} className='w-[75%]' />
          </div>

          {/* Right Panel */}

          <div className=''>
            <header className='flex justify-between items-center pb-6 pt-6 p x-4'>
              <img src={Logo} className='w-[50%]' />
              <div className='border border-purple-300 px-3 py-1.5 rounded-lg text-sm cursor-pointer'>
                EN ▼
              </div>
            </header>

            <h2 className='text-4xl font-extrabold text-gray-900 leading-tight mb-12 max-w-xl justify-center text-center mt-12'>Our free <span className='text-indigo-700'>ADA and WCAG</span> {" "} compliance checker identifies web accessibility issues</h2>

            <div className='flex flex-col lg:flex-row gap-4 justify-center'>
              <div className='flex items-center border border-gray-200 rounded-xl py-3 w-full lg:w-[340px]'>
                <input type='text' placeholder='Enter website URL' value={url} onChange={(e) => setUrl(e.target.value)} className='w-full outline-none text-sm' />
              </div>
              <select value={standard} onChange={(e) => setStandard(e.target.value)} className='h-[46px] px-4 rounded-xl border border-purple-600 text-sm bg-white'>
                <option>WCAG 2.0, 2.1 & 2.2</option>
              </select>
              
            </div>
            <button onClick={handleScan} className='h-[46px] px-6 rounded-xl bg-purple-900 text-white mt-12 justify-center m-auto flex justify-center align-center'>Start Scan</button>
          </div>
        </div>
    </div>
  )
}

export default Home