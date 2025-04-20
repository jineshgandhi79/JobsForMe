import React, { useState, useEffect } from 'react';

const Filter = ({ onApplyFilters, activeFilters, setIsComponentVisible }) => {
  const [jobType, setJobType] = useState(activeFilters?.jobType || 'Default');

  useEffect(() => {
    setJobType(activeFilters?.jobType || 'Default');
  }, [activeFilters]);

  const handleApplyFilters = () => {
    onApplyFilters({ jobType });
  };

  const handleClearFilters = () => {
    setJobType('Default');
    onApplyFilters({ jobType: 'Default' });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filter Jobs</h2>
        {activeFilters?.jobType !== 'Default' && (
          <button
            onClick={handleClearFilters}
            className="text-sm cursor-pointer text-blue-600 hover:text-blue-800"
          >
            Clear filters
          </button>
        )}
      </div>
      
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
