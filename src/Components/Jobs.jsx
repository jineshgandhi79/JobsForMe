import React from 'react'
import JobCard from './JobCard'

function Jobs() {
  const job = {
    "id": "job_001",
    "title": "Backend Developer",
    "company": "BrightPath",
    "location": "Chennai",
    "type": "Remote",
    "skills": [
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL"
    ],
    "expected_salary": "16-29 LPA",
    "experience_required": "1+ years",
    "apply_link": "https://example.com/apply/job_001",
    "posted_date": "2025-04-09"
  }
  return (
    <JobCard job={job}/>
  )
}

export default Jobs