import React, { useState, useEffect } from 'react';

const Filter = ({ onApplyFilters, activeFilters, setIsComponentVisible }) => {
  const [jobType, setJobType] = useState(activeFilters?.jobType || 'Default');
  const [minSalary, setMinSalary] = useState(activeFilters?.minSalary || '');
  const [maxSalary, setMaxSalary] = useState(activeFilters?.maxSalary || '');

  useEffect(() => {
    setJobType(activeFilters?.jobType || 'Default');
    setMinSalary(activeFilters?.minSalary || '');
    setMaxSalary(activeFilters?.maxSalary || '');
  }, [activeFilters]);

  const handleApplyFilters = () => {
    onApplyFilters({ 
      jobType,
      minSalary: minSalary || '',
      maxSalary: maxSalary || ''
    });
  };

  const handleClearFilters = () => {
    setJobType('Default');
    setMinSalary('');
    setMaxSalary('');
    onApplyFilters({ jobType: 'Default', minSalary: '', maxSalary: '' });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filter Jobs</h2>
        {(activeFilters?.jobType !== 'Default' || activeFilters?.minSalary || activeFilters?.maxSalary) && (
          <button
            onClick={handleClearFilters}
            className="text-sm cursor-pointer text-blue-600 hover:text-blue-800"
          >
            Clear filters
          </button>
        )}
      </div>
      
      {/* Job Type Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Type
        </label>
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="w-full cursor-pointer p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Default">All Types</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="On-site">On-site</option>
        </select>
      </div>

      {/* Salary Range Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Expected Salary (LPA)
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            placeholder="Min"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
            placeholder="Max"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <button
        onClick={handleApplyFilters}
        className="w-full cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;
