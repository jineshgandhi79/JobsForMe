import React, { useState, useEffect, useContext } from "react";
import { skills } from "../datasets/skills";
import { UserContext } from "../Contexts/UserContext";

const Filter = ({ onApplyFilters, activeFilters }) => {
  // Initialize state with stored filters
  const [jobType, setJobType] = useState(activeFilters?.jobType || "Default");
  const [minSalary, setMinSalary] = useState(activeFilters?.minSalary || "");
  const [maxSalary, setMaxSalary] = useState(activeFilters?.maxSalary || "");
  const [experience, setExperience] = useState(activeFilters?.experience || "");
  const [selectedSkills, setSelectedSkills] = useState(
    activeFilters?.skills || []
  );

  const { userData } = useContext(UserContext);

  useEffect(() => {
    setJobType(activeFilters?.jobType || "Default");
    setMinSalary(activeFilters?.minSalary || "");
    setMaxSalary(activeFilters?.maxSalary || "");
    setExperience(activeFilters?.experience || "");
    setSelectedSkills(activeFilters?.skills || []);
  }, [activeFilters]);

  const handleApplyFilters = () => {
    onApplyFilters({
      jobType,
      minSalary: minSalary || "",
      maxSalary: maxSalary || "",
      experience: experience || "",
      skills: selectedSkills,
    });
  };

  const handleClearFilters = () => {
    const defaultFilters = {
      jobType: "Default",
      minSalary: "",
      maxSalary: "",
      experience: "",
      skills: [],
    };

    setJobType(defaultFilters.jobType);
    setMinSalary(defaultFilters.minSalary);
    setMaxSalary(defaultFilters.maxSalary);
    setExperience(defaultFilters.experience);
    setSelectedSkills(defaultFilters.skills);

    onApplyFilters(defaultFilters);
    localStorage.removeItem("jobFilters"); // Clear from localStorage
  };

  const handleSkillChange = (skillName) => {
    setSelectedSkills((prev) =>
      prev.includes(skillName)
        ? prev.filter((s) => s !== skillName)
        : [...prev, skillName]
    );
  };

  const handleApplyUserPreferences = () => {
    console.log("Applying user preferences, userData:", userData);
    if (!userData?.jobType || !userData?.skills) {
      console.log("Missing required user data");
      return;
    }

    // Capitalize first letter to match job data format
    const capitalizedJobType = userData.jobType.charAt(0).toUpperCase() + userData.jobType.slice(1);
    
    // Get skill names from user's skill IDs
    const userSkillNames = userData.skills
      .map((skillId) => skills.find((s) => s.id === skillId)?.name)
      .filter(Boolean);

    // Create filters object with user preferences
    const userFilters = {
      jobType: capitalizedJobType,
      minSalary: "",
      maxSalary: "",
      experience: userData.experience?.toString() || "0",
      skills: userSkillNames,
    };

    // Update all states
    setJobType(userFilters.jobType);
    setMinSalary(userFilters.minSalary);
    setMaxSalary(userFilters.maxSalary);
    setExperience(userFilters.experience);
    setSelectedSkills(userSkillNames);

    // Apply filters
    onApplyFilters(userFilters);
  };

  return (
    <div className="p-4 overflow-visible">
      {userData?.jobType && (
        <button
          onClick={handleApplyUserPreferences}
          className="sticky top-0 z-[101] w-full mb-3 cursor-pointer bg-indigo-100 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-200 transition-colors duration-300"
        >
          Use My Preferences
        </button>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filter Jobs</h2>
        {(activeFilters?.jobType !== "Default" ||
          activeFilters?.minSalary ||
          activeFilters?.maxSalary ||
          activeFilters?.experience ||
          (activeFilters?.skills && activeFilters.skills.length > 0)) && (
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

      {/* Experience Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Experience (Years)
        </label>
        <input
          type="number"
          min="0"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="Enter years of experience"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">Enter 0 for fresher</p>
      </div>

      {/* Skills Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Skills
        </label>
        <div className="max-h-40 overflow-y-auto space-y-2">
          {skills.map((skill) => (
            <label key={skill.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedSkills.includes(skill.name)}
                onChange={() => handleSkillChange(skill.name)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{skill.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <button
          onClick={handleApplyFilters}
          className="w-full cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
