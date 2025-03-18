import { useState } from "react";
import { Link } from "react-router-dom";
import CreateJob from "./CreateJobModal";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="container mx-auto flex justify-center">
          <ul className="flex items-center space-x-6 text-gray-600">
            {/* Logo Placeholder */}
            <li>
              <div className="w-10 h-10 rounded-full">
                <img src="/company.png" alt="company-logo" />
              </div>
            </li>

            <li>
              <Link to="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-blue-600">
                Find Jobs
              </Link>
            </li>
            <li>
              <Link to="/talents" className="hover:text-blue-600">
                Find Talents
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-600">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/testimonials" className="hover:text-blue-600">
                Testimonials
              </Link>
            </li>

            {/* Create Job Button (Triggers Modal) */}
            <li>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-full font-medium hover:bg-purple-700"
              >
                Create Jobs
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Job Modal Component */}
      <CreateJob
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
