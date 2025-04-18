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
    isLoading ? (
      <Loader/>
    ) :
    (<>
      <ul>
        {
          jobs.map((job)=>(
            <li key={job.id}>
              <JobCard job={job}/>
            </li>
          ))
        }
      </ul>
    </>)
  )
} 

export default Jobs