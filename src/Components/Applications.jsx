import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobCard from "./JobCard";
import Loader from "./Loader";

function Applications() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/jobs_mock_data.json")
      .then((response) => response.json())
      .then((data) => {
        // Filter jobs based on their stored status in localStorage
        const filteredJobs = data.filter(job => {
          const savedStatus = localStorage.getItem(`job-${job.id}-status`);
          return savedStatus && savedStatus !== 'Select';
        });
        setJobs(filteredJobs);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
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
              Current Applications
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Track your job applications and their status
            </p>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">
              No Applications Yet 🚀
            </h2>
            <p className="text-gray-600 mb-6">
              You haven't tracked any job applications yet. Set a status to start tracking!
            </p>
            <Link 
              to="/jobs"
              className="inline-block px-6 py-3 text-white font-semibold bg-indigo-600 
                rounded-lg hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-4 
                focus:ring-indigo-300 shadow-md"
            >
              Explore Jobs
            </Link>
          </div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <li key={job.id} className="flex">
                  <JobCard job={job} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Applications;
