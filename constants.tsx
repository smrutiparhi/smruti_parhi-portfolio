
import { Project, Education, Skill, Experience } from './types';

export const PERSONAL_INFO = {
  name: "Smruti Ranjan Parhi",
  title: "Computer Science Student & Software Developer",
  email: "smrutiparhi81@gmail.com",
  phone: "+91 7735074703",
  location: "Bhadrak, Odisha, India",
  linkedin: "https://www.linkedin.com/in/smruti-parhi",
  github: "https://github.com/smrutiparhi",
  portfolio: "https://smruti-portfolio.onrender.com",
  avatar: "https://picsum.photos/seed/smruti/400/400" // Placeholder for actual avatar
};

export const SKILLS: Skill[] = [
  {
    category: "Languages",
    items: ["Java", "C", "C++", "HTML", "CSS", "JavaScript", "ReactJs", "Python"],
    proficiency: [90, 85, 80, 95, 95, 88, 85, 75]
  },
  {
    category: "Concepts",
    items: ["Data Structures & Algorithms (DSA)", "Object-Oriented Programming (OOP)", "DBMS", "Operating Systems (OS)"],
    proficiency: [85, 90, 80, 75]
  },
  {
    category: "Creative Tools",
    items: ["Adobe Premiere Pro", "Canva", "Figma", "Graphic Design"],
    proficiency: [80, 90, 85, 85]
  },
  {
    category: "Soft Skills",
    items: ["Problem-Solving", "Team Collaboration", "Leadership", "Communication", "Time Management", "Adaptability"],
    proficiency: [90, 95, 85, 90, 88, 92]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "KrishiMitra",
    role: "Full Stack Developer",
    type: "AI/ML | Web App",
    description: "An AI-powered farmer assistance platform for modern agriculture.",
    details: [
      "Built an AI-powered platform offering crop suggestions, disease detection alerts, and market price predictions for farmers.",
      "Integrated machine learning models for crop analysis and agricultural recommendation.",
      "Designed a responsive UI with React and implemented backend workflows using REST APIs."
    ],
    tech: ["React", "Python", "ML", "REST API"],
    github: "https://github.com/smrutiparhi",
    image: "https://picsum.photos/seed/krishi/800/600"
  },
  {
    title: "Arcade Learn",
    role: "Frontend Developer",
    type: "Interactive Learning Platform",
    description: "A gamified learning website with interactive modules and clean UI components.",
    details: [
      "Developed an interactive web learning platform featuring fun short learning modules and gamified lessons.",
      "Built the full frontend using HTML, CSS, and JavaScript with a focus on speed and responsiveness.",
      "Designed user-friendly layouts in Figma and optimized performance for quick loading."
    ],
    tech: ["HTML", "CSS", "JavaScript", "Figma"],
    link: "https://arcade-learn-gqp0.onrender.com/",
    github: "https://github.com/smrutiparhi",
    image: "https://picsum.photos/seed/arcade/800/600"
  },
  {
    title: "Heart Disease Prediction System",
    role: "Machine Learning Developer",
    type: "Health Tech | ML",
    description: "Implemented ML models to analyze patient health parameters and predict heart disease risk.",
    details: [
      "Used Python, Pandas, NumPy, and Scikit-learn for data preprocessing and prediction modeling.",
      "Built a simple web interface to improve accessibility for non-technical users."
    ],
    tech: ["Python", "Pandas", "Scikit-learn", "NumPy"],
    github: "https://github.com/smrutiparhi",
    image: "https://picsum.photos/seed/heart/800/600"
  },
  {
    title: "60-Second AI News Summarizer",
    role: "AI/ML | Full Stack",
    type: "Productivity Tool",
    description: "Tool that converts long news articles into short, readable 60-second summaries using AI.",
    details: [
      "Integrated NLP models and built a responsive frontend for easy usage.",
      "Deployed using hosting platforms like Render and GitHub Pages."
    ],
    tech: ["NLP", "React", "Node.js", "AI"],
    github: "https://github.com/smrutiparhi",
    image: "https://picsum.photos/seed/news/800/600"
  }
];

export const CURRENTLY_LEARNING = [
  "Advanced AI & Machine Learning",
  "Cloud Computing (AWS/Azure)",
  "System Design & Architecture",
  "Web3 & Blockchain Development"
];

export const EXPERIENCE: Experience[] = [
  {
    role: "Software Developer (Projects & Contributions)",
    company: "Freelance / Academic Projects",
    period: "2023 - Present",
    location: "Remote",
    points: [
      "Developed and deployed multiple full-stack and frontend applications using HTML, CSS, JavaScript, React, and Node.js.",
      "Collaborated with GitHub for version control and deployed applications through Render, Netlify, and GitHub Pages.",
      "Designed user interfaces using Figma, Canva and transformed them into responsive web components."
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    degree: "Bachelor of Technology (B.Tech) in Computer Science",
    institution: "Koneru Lakshmaiah University",
    period: "2024 – Present",
    location: "Hyderabad, India",
    grade: "CGPA: 8.44"
  },
  {
    degree: "Class XII (Senior Secondary)",
    institution: "ODM International School",
    period: "2022 – 2023",
    location: "Bhubaneswar, India",
    grade: "71.2%"
  },
  {
    degree: "Class X (Secondary)",
    institution: "St Xavier's High School",
    period: "2020 – 2021",
    location: "Bhadrak, India",
    grade: "78.2%"
  }
];

export const CERTIFICATES = [
  "Operating Systems Basics",
  "Introduction to Git and GitHub",
  "500 difficulty rating by CodeChef",
  "Responsive Web Design",
  "HTML Tutorial",
  "Java (Basic)"
];

export const TESTIMONIALS = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Professor, Computer Science Department",
    company: "GIET University",
    content: "Smruti has demonstrated exceptional skills in software development and problem-solving. His dedication to learning and ability to tackle complex projects sets him apart from his peers.",
    image: "https://picsum.photos/seed/prof1/200/200",
    rating: 5
  },
  {
    name: "Priya Sharma",
    role: "Tech Lead",
    company: "Innovation Labs",
    content: "Working with Smruti on the KrishiMitra project was a great experience. His technical expertise and collaborative approach made the project a success. Highly recommended!",
    image: "https://picsum.photos/seed/tech1/200/200",
    rating: 5
  },
  {
    name: "Aditya Patel",
    role: "Senior Developer",
    company: "WebTech Solutions",
    content: "Smruti's work on web development projects showcases his strong understanding of modern frameworks and clean code practices. A talented developer with great potential.",
    image: "https://picsum.photos/seed/dev1/200/200",
    rating: 5
  }
];
