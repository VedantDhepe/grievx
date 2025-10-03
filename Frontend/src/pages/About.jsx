import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

// Fill these with your real data!
const team = [
  {
    name: "Jay Joshi",
    role: "Project Lead",
    email: "jayjoshi9923@gmail.com",
    github: "https://github.com/JayJoshi9923",
    linkedin: "https://www.linkedin.com/in/jay-joshi-ba778325b/",
    photo: "JayPhoto.jpg", // Change to real photo URL
  },
  {
    name: "Vedant Dhepe",
    role: "Full Stack Developer",
    email: "vedantdhepe101@gmail.com",
    github: "https://github.com/VedantDhepe",
    linkedin: "https://linkedin.com/in/VedantDhepe",
    photo: "VedantPhoto.jpg", // Replace as needed
  },
  {
    name: "Nishant Bayaskar",
    role: "ML/DA Engineer",
    email: "bayaskarnishant6@gmail.com",
    github: "https://github.com/alpha31032005",
    linkedin: "https://linkedin.com/in/nishant-bayaskar-ba1323262",
    photo: "NishantPhoto.jpg",
  },
  {
    name: "Bhumika Thakare",
    role: "Frontend Developer",
    email: "bhumikathakare@gmail.com",
    github: "https://github.com/member4",
    linkedin: "https://linkedin.com/in/member4",
    photo: "https://avatars.githubusercontent.com/u/91714690?v=4",
  },
  {
    name: "Madhura Bathe",
    role: "AI/ML Engineer",
    email: "member5@email.com",
    github: "https://github.com/member5",
    linkedin: "https://linkedin.com/in/member5",
    photo: "https://avatars.githubusercontent.com/u/91714690?v=4",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-lime-200 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white/80 rounded-xl shadow-xl py-12 px-8 flex flex-col gap-7">
        {/* Project Details */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-purple-800 mb-3 tracking-wide">About GrievX</h1>
          <p className="text-lg text-gray-700 mx-auto max-w-2xl">
            <span className="font-semibold text-purple-700">GrievX</span> is a smart civic complaint management platform built to empower citizens and authorities with fast, transparent, and data-driven issue resolution. 
            Our project features role-based dashboards, advanced analytics, and state-of-the-art user experience for managing urban grievances across Maharashtra and beyond.
          </p>
        </div>
        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold text-purple-700 mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl shadow-lg p-7 flex flex-col items-center hover:scale-105 transition duration-250 border border-purple-100">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="rounded-full w-28 h-28 object-cover mb-4 shadow-lg border-4 border-lime-200"
                />
                <div className="text-xl font-bold text-purple-900">{member.name}</div>
                <div className="text-md text-gray-700 mb-2">{member.role}</div>
                <div className="flex gap-4 mt-2">
                  <a href={`mailto:${member.email}`} target="_blank" rel="noopener noreferrer" aria-label="Email" className="text-purple-500 hover:text-purple-800">
                    <FaEnvelope size={24} />
                  </a>
                  <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-800 hover:text-black">
                    <FaGithub size={24} />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#0077b5] hover:text-blue-900">
                    <FaLinkedin size={24} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Project Extra Details */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
 
  <div className="bg-lime-50 rounded-lg shadow p-6 text-left text-base">
    <b>How does GrievX help you?</b>
    <ul className="list-disc list-inside mt-2 text-gray-700">
      <li>
        <b>Citizens:</b> Instantly report civic issues & get real-time updates. Your complaint reaches the right authority, and you track progress at every stage.
      </li>
      <li>
        <b>Admins:</b> Centralized dashboard to resolve cases, prioritize tasks, and communicate with citizens—making municipality processes fast and fair.
      </li>
      <li>
        <b>Supervisors/Chiefs:</b> Monitor complaint volumes, overdue cases, and team performance. Ensure high-impact problems are resolved efficiently.
      </li>
      <li>
        <b>Built for Maharashtra:</b> Detailed area support, with every district & taluka covered.
      </li>
      <li>
        <b>User-friendly for all:</b> Simple forms, mobile-ready design, clear language. GrievX makes civic engagement available to everyone.
      </li>
      <li>
        <b>Purpose:</b> To build a cleaner, safer, and more responsive community by bridging the gap between citizens and city governments.
      </li>
    </ul>
  </div>
</div>
      </div>
    </div>
  );
}
