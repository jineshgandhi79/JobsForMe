import React from 'react';
import { Building2, MapPin, Calendar, Briefcase, IndianRupee, Clock } from 'lucide-react';

const JobCard = ({ job }) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100">  
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {job.title}
        </h3>
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
