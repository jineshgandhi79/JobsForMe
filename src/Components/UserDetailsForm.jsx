import React, { useState, useEffect } from 'react';
import { skills } from '../datasets/skills';
import { Save } from 'lucide-react';
import UserDetails from './UserDetails';

function UserDetailsForm() {

  const [submitted,setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    skills: [],
    jobType: 'remote',
    experience: ''
  });

  useEffect(() => {
    const savedData = localStorage.getItem('userProfile');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(formData));
    setSubmitted(true)
  };

  const handleSkillChange = (skillId) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skillId)
        ? prev.skills.filter(id => id !== skillId)
        : [...prev.skills, skillId]
    }));
  };

  return (
    submitted ? (
      <UserDetails/>
    ) : (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              required
              value={formData.dob}
              onChange={(e) => setFormData({...formData, dob: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Job Type</label>
            <select
              value={formData.jobType}
              onChange={(e) => setFormData({...formData, jobType: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            >
              <option value="remote">Remote</option>
              <option value="onsite">On Site</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience (years)</label>
            <input
              type="number"
              min="0"
              max="50"
              required
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
            <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-4 space-y-2">
              {skills.map((skill) => (
                <label key={skill.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.skills.includes(skill.id)}
                    onChange={() => handleSkillChange(skill.id)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">{skill.name}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-8 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg
            hover:bg-indigo-700 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Save size={20} />
            Save Profile
          </button>
        </form>
      </div>
    </div>
    )
  );
}

export default UserDetailsForm;