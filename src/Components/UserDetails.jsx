import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Briefcase, GraduationCap, Tags } from 'lucide-react';
import UserDetailsForm from './UserDetailsForm';
import { skills as skillsList } from '../datasets/skills';

function UserDetails() {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-700 to-indigo-600 p-8">
          <div className="flex items-center gap-4">
            <div className="bg-white/15 p-4 rounded-full">
              <User size={25} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{userData.name}</h1>
              <p className="text-indigo-100">{userData.email}</p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-8 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <Calendar className="text-indigo-600" size={20} />
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="text-gray-700">{new Date(userData.dob).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Briefcase className="text-indigo-600" size={20} />
              <div>
                <p className="text-sm text-gray-500">Preferred Job Type</p>
                <p className="text-gray-700 capitalize">{userData.jobType}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap className="text-indigo-600" size={20} />
              <div>
                <p className="text-sm text-gray-500">Experience</p>
                <p className="text-gray-700">{userData.experience} years</p>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="border-t pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Tags className="text-indigo-600" size={20} />
              <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {getUserSkills().map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setUserData(null)}
            className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 text-white font-medium 
              bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-300 cursor-pointer"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
