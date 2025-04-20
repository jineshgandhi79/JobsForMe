import React, { useEffect, useState, useRef } from 'react'
import JobCard from './JobCard'
import Loader from './Loader';

function Jobs() {
  const [jobs,setJobs] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const componentRef = useRef(null);
  const buttonRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/jobs_mock_data.json')
      .then(response => response.json())
      .then(data => {
        setJobs(data);
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        componentRef.current && 
        !componentRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsComponentVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            {/* Centered title section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Jobs For You
              </h1>
              <p className="mt-3 text-lg text-gray-600">
                Discover opportunities that match your expertise
              </p>
            </div>

            {/* Search bar and toggle button container */}
            <div className="relative flex items-center justify-center gap-4">
              <div className="w-full max-w-2xl">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jobs..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                ref={buttonRef}
                onClick={() => setIsComponentVisible(!isComponentVisible)}
                className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded-lg whitespace-nowrap"
              >
                Toggle Component
              </button>
              
              {isComponentVisible && (
                <div
                  ref={componentRef}
                  className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10"
                >
                  <h2 className="text-lg font-semibold">Your Component</h2>
                  <p>This is your component content</p>
                </div>
              )}
            </div>
          </div>
          
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <li key={job.id} className="flex">
                <JobCard job={job}/>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Jobs