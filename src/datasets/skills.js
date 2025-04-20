const skills_pool = {
  "Frontend Developer": ["React", "JavaScript", "HTML", "CSS"],
  "Backend Developer": ["Node.js", "Express", "MongoDB", "PostgreSQL"],
  "Full Stack Engineer": ["React", "Node.js", "MongoDB", "Docker"],
  "Data Scientist": ["Python", "Pandas", "NumPy", "TensorFlow"],
  "ML Engineer": ["Python", "scikit-learn", "TensorFlow", "Jupyter"],
  "DevOps Engineer": ["AWS", "Docker", "Kubernetes", "CI/CD"],
  "Cloud Architect": ["Azure", "AWS", "Terraform", "Ansible"],
  "System Admin": ["Linux", "Shell Scripting", "Networking"],
  "Product Manager": ["Agile", "Scrum", "Product Roadmaps"],
  "UI/UX Designer": ["Figma", "Sketch", "Adobe XD", "Prototyping"],
  "Data Analyst": ["SQL", "Power BI", "Tableau", "Excel"],
  "Android Developer": ["Kotlin", "Android Studio", "Java"],
  "iOS Developer": ["Swift", "Xcode", "UIKit"],
  "QA Engineer": ["Manual Testing", "TestRail", "Bug Reporting"],
  "Automation Tester": ["Selenium", "Java", "TestNG"],
  "Business Analyst": ["Requirement Gathering", "JIRA", "Excel"],
  "Tech Support Engineer": ["Troubleshooting", "Customer Service"],
  "AI Researcher": ["Deep Learning", "PyTorch", "Research Papers"],
  "Security Analyst": ["Firewalls", "SIEM", "Network Security"],
  "Blockchain Developer": ["Solidity", "Ethereum", "Smart Contracts"]
};

const techSkills = new Set([].concat(...Object.values(skills_pool)));

export const skills = Array.from(techSkills).map((skill) => {
  return {
    name: skill,
    id: skill.toLowerCase().replace(/\s+/g, "-")
  };
});
