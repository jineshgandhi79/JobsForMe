import React, { useEffect, useState } from 'react'
import JobCard from './JobCard'
import Loader from './Loader';

function Jobs() {
  const [jobs,setJobs] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/jobs_mock_data.json')
      .then(response => response.json())
      .then(data => {
        setJobs(data);
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Jobs For You
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Discover opportunities that match your expertise
            </p>
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