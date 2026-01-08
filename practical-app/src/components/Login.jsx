import React, { useState } from 'react';
import bgImage from '../images/bgImage.png'
import logo from '../images/logo.svg';
import rightPanel from '../images/rightPanel.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch ("https://skynetaccessibilityscan.com/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept : "application/json",
                },
                body: JSON.stringify({
                    email: "qa2@skynettechnologies.com",
                    iv: "TjquPCdQZCcBDynp",
                    password: "wbySE9NKz/DGVVzImb/KrbDYNH30TbMUtQ==",
                    salt: "yD0DczvlVpcGxRagBTlIvw=="
                }),
            });
            const result = await res.json();

            localStorage.setItem('token', result.token);
            navigate('/dashboard');
        }
        catch (error) {
            localStorage.setItem('token', 'mock-token');
            navigate('/dashboard');
            console.log("Login Error", error);
        }
        
        // Handle login logic here
    }


  return (
    <div className='min-h-screen bg-white flex flex flex-col px-6'>
        {/* Header */}
        <header className='p-10'>
            <div className='flex items-center gap-3'>
                <div className='w-[20%]'>
                    <img src={logo} />
                </div>
            </div>
        </header>
        <div className='flex-1 flex  px-6 lg:px-12'>
            {/* Left Section */}
            <div className='bg-[#FAF5FF] flex-1 flex items-center flex-col'>
                {/* <div className='mb-10'>
                    <img ></img>
                </div> */}

                <h1 className='text-5xl font-semibold mb-12 mt-10'>Welcome Back</h1>

                <form onSubmit={handleSubmit} className='space-y-6 w-[80%]'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Email Address
                        </label>
                        <input type='email' required value={email} onChange={(e) => setEmail(e.target.value)} className='w-full px-4 py-3 rounded-lg border border-gray focus:ring-2 focus:ring-purple-600 focus:outline-none' />
                    </div>
                        
                    
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Password
                        </label>
                        <input type='password' required value={password} onChange={(e) => setPassword(e.target.value)} className='w-full px-4 py-3 rounded-lg border border-gray focus:ring-2 focus:ring-purple-600 focus:outline-none' />
                        
                    </div>

                    <button type='submit' className='w-full bg-[#420083] text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition duration-300'>
                        Login
                    </button>
                </form>

                <div className='mt-6 text-center space-y-3'>
                    <a href="#" className='text-sm text-gray-600 hover:underline'>Forgot Password?</a>
                </div>

                <div>
                    <a href="#" className='text-sm font-semibold text-purple-700 hover:underline'>Start Free Trial</a>
                </div>
            </div>

            {/* Right Section */}
        <div className='hidden lg:block w-full max-w-2xl flex justify-center' style={{backgroundImage: `url('${bgImage}')`}}>
            <div className='w-[80%] flex justify-center items-center m-auto h-full'>
            <img src={rightPanel} alt="Right Panel" />
            </div>
        </div>
        </div>

        <footer className='p-6 flex flex-wrap items-center justify-between text-sm text-gray-600'>
            <div >© 2025, Skynet Technologies</div>
            <div className='flex gap-4 flex-wrap'>
                <button className='hover:text-purple-700 transition font-semibold'>Terms & Conditions</button>
                <span>.</span>
                <button className='hover:text-purple-700 transition font-semibold '>Privacy Policy</button>
                <span>.</span>
                <button className='hover:text-purple-700 transition font-semibold'>Disclaimer</button>
                <span>.</span>
                <button className='hover:text-purple-700 transition font-semibold'>Accessibility Statement</button>

            </div>
        </footer>

        
        </div>
  )
}

export default Login