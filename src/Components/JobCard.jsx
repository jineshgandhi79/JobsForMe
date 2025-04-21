import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Calendar, Briefcase, IndianRupee, Clock } from 'lucide-react';

const JobCard = ({ job }) => {
  const statusOptions = [
    'Select', 'Exploring', 'Interested', 'Shortlisted', 'Applied',
    'In Progress', 'Offered', 'Accepted', 'Rejected', 'Archived'
  ];

  const [status, setStatus] = useState('Select');

  useEffect(() => {
    const savedStatus = localStorage.getItem(`job-${job.id}-status`);
    if (savedStatus) {
      setStatus(savedStatus);
    }
  }, [job.id]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    localStorage.setItem(`job-${job.id}-status`, newStatus);
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100">  
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
            {job.title}
          </h3>
          <select
            value={status}
            onChange={handleStatusChange}
            className="ml-4 cursor-pointer px-2 py-1 text-sm border border-gray-200 rounded-md bg-white text-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Building2 size={18} />
          <span className="text-sm font-medium">{job.company}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin size={18} />
          <span className="text-sm">{job.location}</span>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-6 space-y-4">
        {/* Job Type & Experience */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Briefcase size={16} className="text-indigo-600" />
            <span className="text-sm text-gray-600">{job.type}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-indigo-600" />
            <span className="text-sm text-gray-600">{job.experience_required}</span>
          </div>
        </div>

        {/* Salary */}
        <div className="flex items-center gap-2">
          <IndianRupee size={16} className="text-indigo-600" />
          <span className="text-sm text-gray-600">{job.expected_salary}</span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Posted Date */}
        <div className="flex items-center gap-2 text-gray-500">
          <Calendar size={16} />
          <span className="text-sm">Posted {job.posted_date}</span>
        </div>
      </div>

      {/* Apply Button */}
      <div className="p-6 pt-0">
        <a
          href={job.apply_link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-block text-center px-6 py-3 text-white font-medium bg-indigo-600 
            rounded-lg hover:bg-indigo-700 transition-colors duration-300"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default JobCard;
