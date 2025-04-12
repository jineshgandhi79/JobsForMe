const techSkills = new Set([
    "Full Stack Development",
    "Frontend Development",
    "Backend Development",
    "System Design",
    "Data Structures & Algorithms",
    "DevOps",
    "Cloud Computing",
    "Cybersecurity",
    "Machine Learning",
    "Deep Learning",
    "Artificial Intelligence",
    "Data Science",
    "Data Engineering",
    "Mobile App Development",
    "iOS Development",
    "Android Development",
    "Cross-platform Development",
    "React Native",
    "Game Development",
    "Blockchain Development",
    "Web3",
    "Augmented Reality (AR)",
    "Virtual Reality (VR)",
    "UI/UX Design",
    "Product Management",
    "Database Management",
    "SQL",
    "NoSQL",
    "API Development",
    "Microservices",
    "Containerization (Docker, Kubernetes)",
    "Site Reliability Engineering (SRE)",
    "Software Testing",
    "Test Automation",
    "CI/CD",
    "Big Data",
    "Edge Computing",
    "Embedded Systems",
    "Internet of Things (IoT)",
    "Robotics",
    "Quantum Computing",
    "Technical Writing",
    "Game Design",
    "Performance Optimization",
    "Networking",
    "Operating Systems",
    "Computer Architecture",
    "Ethical Hacking",
    "Penetration Testing",
    "Virtualization",
    "Natural Language Processing (NLP)",
    "Computer Vision"
  ]);
  
export const skills = Array.from(techSkills).map((skill) => {
    return {
      name: skill,
      id: skill.toLowerCase().replace(/\s+/g, "-")
    };
  } );