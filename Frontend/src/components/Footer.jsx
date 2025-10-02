import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt, FaCode } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-teal-900 backdrop-blur-lg border-t border-purple-200 shadow-[0_-6px_24px_0_rgba(80,0,200,0.08)] py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left: Project Identity */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <span className="font-extrabold text-2xl text-white tracking-wide">GrievX</span>
          <span className="text-lg text-gray-300 font-semibold">
            Smart Civic Complaint Management Platform
          </span>
        </div>
        {/* Middle: Project Links */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-8">
            <a
              href="https://github.com/VedantDhepe"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GrievX Repository"
              className="text-gray-300 hover:text-white transition"
            >
              <FaGithub size={32} />
            </a>
            <a
              href="https://www.linkedin.com/in/vedant-dhepe-460985252/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GrievX LinkedIn"
              className="text-[#8ecae6] hover:text-white transition"
            >
              <FaLinkedin size={32} />
            </a>
            <a
              href="mailto:grievX@gmail.com"
              aria-label="Contact GrievX Support"
              className="text-red-400 hover:text-red-200 transition"
            >
              <FaEnvelope size={32} />
            </a>
            <a
              href="tel:+917972261841"
              aria-label="Call GrievX Support"
              className="text-green-300 hover:text-green-100 transition"
            >
              <FaPhoneAlt size={30} />
            </a>
          </div>
          <div className="text-base text-gray-300 mt-2">
            &bull; <a href="mailto:grievX@gmail.com" className="underline">grievX@gmail.com</a> &bull; +91-7972261841
          </div>
        </div>
        {/* Right: Project Signature */}
        <div className="flex flex-col items-center md:items-end space-y-2 text-base text-gray-300">
          <span className="flex items-center gap-2">
            <FaCode className="mr-1 text-white" size={22} />
            <span className="font-bold text-white">Empowering Residents, Enabling Change</span>
          </span>
          <span className="text-gray-400 font-semibold">
            &copy; {new Date().getFullYear()} GrievX
          </span>
        </div>
      </div>
    </footer>
  );
}
