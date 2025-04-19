import React, { useState, useEffect } from 'react';
import { Calendar, Briefcase, GraduationCap, Tags } from 'lucide-react';
import UserDetailsForm from './UserDetailsForm';
import { skills as skillsList } from '../datasets/skills';

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('userProfile');
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
  }, []);

  if (!userData) {
    return <UserDetailsForm />;
  }

  const getUserSkills = () => {
    return userData.skills.map(skillId => 
      skillsList.find(s => s.id === skillId)?.name
    ).filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50/50 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        {/* Header Section */}
        <div className="relative p-6 sm:p-10 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            
            <div className="min-w-0"> {/* Add min-w-0 to allow text truncation */}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 truncate">{userData.name}</h1>
              <p className="text-gray-600 truncate">{userData.email}</p>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-indigo-600"></div>
        </div>

        {/* Details Section */}
        <div className="p-8 space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <Calendar className="text-indigo-600" size={22} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                <p className="text-gray-900 font-medium">{new Date(userData.dob).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <Briefcase className="text-indigo-600" size={22} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Preferred Job Type</p>
                <p className="text-gray-900 font-medium capitalize">{userData.jobType}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <GraduationCap className="text-indigo-600" size={22} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Experience</p>
                <p className="text-gray-900 font-medium">{userData.experience} years</p>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="border-t pt-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <Tags className="text-indigo-600" size={22} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Skills</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {getUserSkills().map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white rounded-lg border border-indigo-200 
                    hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setUserData(null)}
            className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-3.5 text-white font-medium 
              bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl hover:from-indigo-700 hover:to-indigo-800 
              transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
