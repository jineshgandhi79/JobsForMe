import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import JobCard from "./JobCard";
import Loader from "./Loader";

function Applications() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const [statusFilter, setStatusFilter] = useState("All");

  const statusOptions = [
    'All',
    'Exploring',
    'Interested',
    'Shortlisted',
    'Applied',
    'In Progress',
    'Offered',
    'Accepted',
    'Rejected',
    'Archived'
  ];

  useEffect(() => {
    fetch("/jobs_mock_data.json")
      .then((response) => response.json())
      .then((data) => {
        // Filter jobs based on their stored status in localStorage
        const filteredJobs = data.filter((job) => {
          const savedStatus = localStorage.getItem(`job-${job.id}-status`);
          return savedStatus && savedStatus !== "Select";
        });
        setJobs(filteredJobs);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const query = searchQuery.toLowerCase().replace(/\s+/g, "");
    const matchesSearch = (
      job.title.toLowerCase().replace(/\s+/g, "").includes(query) ||
      job.company.toLowerCase().replace(/\s+/g, "").includes(query) ||
      job.location.toLowerCase().replace(/\s+/g, "").includes(query)
    );

    const jobStatus = localStorage.getItem(`job-${job.id}-status`);
    const matchesStatus = statusFilter === "All" || jobStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
                You haven't tracked any job applications yet. Set a status to
                start tracking!
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
            <>
              {/* Add search bar */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-full max-w-2xl relative">
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search your applications..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        searchRef.current.focus();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 cursor-pointer w-7"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Status filter dropdown */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent cursor-pointer"
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <li key={job.id} className="flex">
                    <JobCard job={job} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Applications;
