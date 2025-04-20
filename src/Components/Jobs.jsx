import React, { useEffect, useState, useRef } from "react";
import JobCard from "./JobCard";
import Loader from "./Loader";
import Filter from "./Filter";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const componentRef = useRef(null);
  const buttonRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({ jobType: 'Default' });

  const filteredJobs = jobs.filter((job) => {
    const query = searchQuery.toLowerCase().replace(/\s+/g, "");
    const matchesSearch = (
      job.title.toLowerCase().replace(/\s+/g, "").includes(query) ||
      job.company.toLowerCase().replace(/\s+/g, "").includes(query) ||
      job.location.toLowerCase().replace(/\s+/g, "").includes(query)
    );

    const matchesJobType = 
      activeFilters.jobType === 'Default' || 
      job.type === activeFilters.jobType;

    // Salary range filtering
    let matchesSalary = true;
    if (activeFilters.minSalary || activeFilters.maxSalary) {
      const salaryRange = job.expected_salary.replace(/[^0-9-]/g, '').split('-');
      let jobMinSalary = parseInt(salaryRange[0]);
      let jobMaxSalary = parseInt(salaryRange[1] || salaryRange[0]);

      const filterMin = activeFilters.minSalary ? parseInt(activeFilters.minSalary) : 0;
      const filterMax = activeFilters.maxSalary ? parseInt(activeFilters.maxSalary) : Infinity;

      matchesSalary = (
        (jobMinSalary >= filterMin && jobMinSalary <= filterMax) ||
        (jobMaxSalary >= filterMin && jobMaxSalary <= filterMax) ||
        (jobMinSalary <= filterMin && jobMaxSalary >= filterMax)
      );
    }

    return matchesSearch && matchesJobType && matchesSalary;
  });

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
  };

  useEffect(() => {
    fetch("/jobs_mock_data.json")
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
                  placeholder="Search by Role, Company, or Location..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                ref={buttonRef}
                onClick={() => setIsComponentVisible(!isComponentVisible)}
                className="bg-[oklch(0.62_0.01_264.7)] cursor-pointer hover:bg-[oklch(0.74_0_0)] text-white px-4 py-2 rounded-lg whitespace-nowrap"
              >
                Filter
              </button>

              {isComponentVisible && (
                <div
                  ref={componentRef}
                  className="absolute right-0 top-full mt-2 w-64 z-10"
                >
                  <Filter 
                    onApplyFilters={handleApplyFilters}
                    activeFilters={activeFilters}
                    setIsComponentVisible={setIsComponentVisible}
                  />
                </div>
              )}
            </div>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.length === 0 ? (
              <p className="">No results found...</p>
            ) : (
              filteredJobs.map((job) => (
                <li key={job.id} className="flex">
                  <JobCard job={job} />
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Jobs;
