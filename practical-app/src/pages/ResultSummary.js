import React, { useEffect, useState } from 'react'
import { checkCompliance } from '../api';

const ResultSummary = () => {

    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await checkCompliance("https://skynettechnologies.com", 1);  
            
            if(data.group_data){
                setGroups(data.group_data);
            }
        }
            catch(error) {
                console.log("Error", error)
            }
            finally{
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);
console.log(groups, 'group_data')
  return (
    <div id="result-wrapper" className='min-h-screen bg-gray-50 px-6 py-8'>

        <header className='mb-8 flex items-center justify-between'>
            <h2 className='text-xl font-semibold text-gray-800'>Accessibility Compliance Report</h2>

            <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition">
                Download Report
            </button>
        </header>

        <h3 className='mb-6 text-center text-gray-600'>
            Click on the categories to check the detailed information.
        </h3>

        {loading ? (
            <div className = "text-center text-gray-500">Loading results...</div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Object.entries(groups).map(([groupName, items]) => {
                   const group = items[0];
                   
                   return (
                    <div key = {groupName} className='rounded-xl border border-purple-300 bg-white p-5 shadow-sm hover:shadow-md transition text-center'>
                        <h4 className='text-center text-[16px] text-base font-semibold text-[#1F2937'>{group.group_name}</h4>

                        <div className='flex items-center justify-between gap-6 mt-3 '>
                            <div className='flex items-center gap-2'>
                            <span className='flex items-center justify-center w-5 h-5 rounded-full bg-[#D1FAE5] text-[#15803D] text-[12px] font-bold'>✔ </span>
                            <span className='text-[14px] text-[#374151] font-medium'>{group.total_success} Passed</span>
                            </div>

                            <div className='flex items-center gap-2'>
                            <span className='flex items-center justify-center w-5 h-5 rounded-full bg-[#FECACA] text-[#B91C1C] text-[12px] font-bold'>X</span>
                            <span className='text-[14px] text-[#374151] font-medium'>{group.total_error} Failed</span>
                            </div>
                    </div>
                    </div>  
                   )
                })}
            </div>
        )} 
    </div>
  )
}

export default ResultSummary