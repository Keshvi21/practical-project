import React, { use, useEffect, useState } from 'react';
import Logo from '../images/dashboardLogo.svg';
import Edit from '../images/Edit.svg';
import Call from '../images/customer-service.svg';
import Flag from '../images/flag.svg';
import Dashboard from '../images/dashboard.svg';
import Alert from '../images/alert.svg';
import Services from '../images/man.svg';
import Logout from '../images/logout.svg'


const SiteList = () => {

    const [scans, setScans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedScan, setSelectedScan] = useState(null);
    const [frequency, setFrequency] = useState(0);
    const [customDate, setCustomDate] = useState('');
    const [isPause, setIsPause] = useState(false);

    useEffect(() => {
        fetchScans();
    }, []);

    const fetchScans = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch("https://skynetaccessibilityscan.com/api/scanner?offset=0&limit=80&terms=", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                }
            }
            )
            const result = await response.json();
            console.log(result, 'resulttttttttttttt')
            // if(result?.data){
                setScans(result.Data)
            // }
            // setScans(result.data || []);
        }
        catch (error) {
            console.log("Error", error);
    }    
    finally {
        setLoading(false);
    }
}

const downloadReport = async (packageId, websiteId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`https://skynetaccessibilityscan.com/api/get-all-violation-pdf?user_package_id=${packageId}&website_id=${websiteId}`, 
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    const data = await res.json();
    console.log(data, 'dataaaaaaaaaaa')
    if(data.pdf_file){
        window.open(data.pdf_file, '_blank');
    }
}
    console.log(scans, 'scans')
    const getFrequencyLabel = (value) => {
        if(value === 0) return "Weekly";
        if(value === 1) return "Monthly";
        if(value === 2) return "Quarterly";
        return "N/A";
    }

    const getScoreColor = (score) => {
        if(score >= 85) return "text-green-600 bg-green-600";
        if(score >= 50) return "text-orange-500 bg-orange-500";
        return "text-red-600 bg-red-600";
    }

    const handleSave = async () => {
  if (!selectedScan) {
    console.error("No scan selected");
    return;
  }

  const token = localStorage.getItem("token");

  try {
    const res = await fetch(
      "https://skynetaccessibilityscan.com/api/scanner/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_package_id: selectedScan.user_package_id,
          website_id: selectedScan.website_id,
          custom_date: customDate || null,
          frequency,
          is_pause_scanning: isPause ? 1 : 0,
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }

    setIsOpen(false);
    fetchScans();
  } catch (err) {
    console.error("Update error:", err);
  }
};



  return (
    <div className='flex min-h-screen bg-gray-50'>
        {/* Sidebar */}
        <div className='w-64 bg-white border-r px-6 py-6'>
            <img src={Logo} alt="Logo" className='mb-8' />

            <nav className='space-y-4 text-sm'>
                <a className='flex items-center gap-2 text-purple-700 font-semibold'>
                   <img src={Dashboard} />  Scan Dashboard
                </a>
                <a className='flex items-center gap-2 text-gray-600 '>
                   <img src={Alert} /> Scan Report
                </a>
                <div className='pt-4'>
                    <p className='text-[#000000] font-semibold mb-2 flex'>
                       <img src={Services} /> Accessibility Add-On Services
                    </p>
                    <ul className='space-y-2 text-gray-600'>
                        <li>All in One Accessibility Widget</li>
                        <li>Manual Audit</li>
                        <li>Native Mobile App Audit</li>
                        <li>Web App-SPA Audit</li>
                    </ul>
                </div>

                <div className='pt-10 text-gray-600 flex'> <img src={Logout} /> Logout</div>
                </nav>
        </div>

        <main className='flex-1 p-8'>
            <div className='flex justify-end'>
            <div className='border p-2 rounded cursor-pointer'>
                <img src={Call} />
            </div>
            <div className='border p-2 rounded flex ml-2 cursor-pointer'>
                <img src={Flag} /> &nbsp; En
            </div>
            <div className='bg-[#545769] ml-2 text-white cursor-pointer rounded-full flex items-center justify-center w-10 h-10 font-bold' >S</div>
            
            </div>
            <h2 className='text-sl font-semibold mb-6 mt-12'>My Scans</h2>
            <div className='grid grid-cols-5 gap-4 px-6 py-4 bg-[#F6EFFF] text-sm font-medium border'>
            <div>Websites</div>
            <div>Monitoring Settings</div>
            <div>Scan Score</div>
            <div>Violations Report</div>
            <div></div>
            </div>

            {scans.map((scan) => (
                <div key={scan.website_id}
                className='grid grid-cols-5 gap-4 px-6 py-5 border items-center text-sm'>

                    <div className='flex items-center gap-3 font-medium'>
                        <img src={scan.fav_icon} className='w-6 h-6'/>
                        {scan.url}
                    </div>

                    <div className='flex items-center gap-2'>
                        {getFrequencyLabel(scan.frequency)}
                        <span className='text-purple-700 cursor-pointer'>
                            <button className='' onClick={() => {
    setSelectedScan(scan);
    setFrequency(scan.frequency ?? 0);
    setIsPause(scan.is_pause_scanning === 1);
    setCustomDate(
      scan.next_scan_date
        ? scan.next_scan_date.split("T")[0]
        : ""
    );
    setIsOpen(true);
  }}>
                            <img src={Edit} alt="Edit" />
                            </button>
                        </span>
                    </div>

                    <div className='w-[102px]'>
                        {scan.success_percentage !== null ? (
                            <>
                            <span className={`font-semibold ${getScoreColor(scan.success_percentage)}.split("")[0]`}>
                                {scan.success_percentage}%
                            </span>
                            <div className='h-1 bg-gray-200 rounded mt-1 font-semibold'>
                                <div className={`h-1 rounded-full ${getScoreColor(scan.success_percentage)}.split("")[1]`} style={{width: `${scan.success_percentage}%`, background: 'orange'}}></div>
                            </div>
                            </>
                            ) : (<span className='text-gray-400'>N/A</span>) }
                    </div>

                    <div>
                        {scan.total_fail_sum ? (
                            <>
                            <div className='font-medium'>Violations: {scan.total_fail_sum}</div>
                            <button 
                            className='text-[#420083] font-semibold underline' 
                            onClick={() => downloadReport(scan.user_package_id, scan.website_id)} >Download Fixes Report</button>
                            </>
                        ) : (
                            <span className='text-gray-400'>N/A</span>
                        )}
                    </div>

                    <button className='border border-[#420083] text-[#420083] px-4 py-2 rounded-md hover:bg-purple-50 font-semibold'>Select URL’s To Scan</button>
                </div>
                    
               
            ))}

            {isOpen && (
                <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
                    <div className='bg-white w-full max-w-xl rounded-2xl p-6 shadow-xl relative'>
                        <button 
                            onClick={() => {
                                setIsOpen(false)
                                setSelectedScan(scans);
                                setFrequency(scans.frequency);
                                setIsPause(scans.is_pause_scanning === 1);
                                setCustomDate(scans.next_scan_date ? scans.next_scan_date.split("")[0] : "");
                            }}
                            className='absolute top-4 right-4 text-red-500 text-lg bg-red'>
                            &times;
                            </button>
                            <h2 className='text-xl font-semibold mb-4'>Monitoring Settings</h2>

                            <span className='flex'>
                            <p className='text-sm mb-4'>Domain: <span className='font-medium'>
                                {selectedScan?.url}
                                </span> </p>

                                <p className='text-sm mb-4 ml-2'>Next Scan: <span className='font-medium'>
                                July 15th 2025
                                </span> </p>
                                </span>

                        <div className='flex items-center gap-3 mb-4'>
                            <label className='retaive inline-flex items-center cursor-pointer'>
                            <input type='checkbox' checked={isPause} onChange={(e) => setIsPause(e.target.checked)} className='h-5 w-5 accent-purple-600 sr-only peer' />
                            <div className='relative w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-gray-500 transition-colors duration-300 mr-2'>
                                <span className='aboulute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 peer-checked:translate-x-5'></span>
                            </div>
                            Pause Monitoring
                            </label>
                        </div> 

                        <div className='mb-4'>
                            <p className='font-medium mb-2'>Scan Frequency</p>
                            <div className='flex gap-6'>
                                {["Weekly", "Monthly", "Quarterly"].map((label, index) => (
                                    <label key={index} className='flex items-center gap-2 cursor-pointer'>
                                        <input type='radio' checked={frequency === index } 
                                        onChange={() => setFrequency(index)} 
                                        className='accent-purple-600' />
                                        {label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className='mb-4'>
                           <p className='font-medium mb-2'>Preferred date for scanning</p> 
                           <input type='date' value={customDate} onChange={(e) => setCustomDate(e.target.value)} className='border rounded-md py-2 w-[200px] px-2' />
                        </div>

                        <div className='flex justify-end gap-3'>
                            <button onClick={() => setIsOpen(false)}
                            className='px-4 py-2 border rounded-lg'>Cancel</button>
                            <button onClick={handleSave} className='px-5 py-2 bg-[#420083] text-white rounded-lg hover:bg-purple-800'>Save</button>
                        </div>
                        </div>
                </div>
            )}
        </main>
        
    </div>
  )
}

export default SiteList