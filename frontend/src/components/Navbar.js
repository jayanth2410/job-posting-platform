import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateJob from "./CreateJobModal";
import { Menu, X } from "lucide-react"; // Icons for the hamburger menu

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 550);
  const [showMenu, setShowMenu] = useState(false);

  // Update isMobile on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 550) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setShowMenu(false); // Close menu on resize to large screen
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // If screen is less than 550px, show mobile version
  if (isMobile) {
    return (
      <>
        <nav className="bg-white px-6 py-4 border-b border-gray-200 relative">
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo */}
            <div className="w-10 h-10">
              <img src="/company.png" alt="company-logo" />
            </div>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-600 focus:outline-none"
            >
              {showMenu ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {showMenu && (
            <ul className="absolute top-full left-0 w-full bg-white shadow-lg z-50 text-center py-4">
              <li>
                <Link
                  to="/"
                  className="block py-2"
                  onClick={() => setShowMenu(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="block py-2"
                  onClick={() => setShowMenu(false)}
                >
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/talents"
                  className="block py-2"
                  onClick={() => setShowMenu(false)}
                >
                  Find Talents
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block py-2"
                  onClick={() => setShowMenu(false)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/testimonials"
                  className="block py-2"
                  onClick={() => setShowMenu(false)}
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setShowMenu(false);
                  }}
                  className="bg-purple-600 text-white px-3 py-2 rounded-full font-medium hover:bg-purple-700 w-auto mt-2"
                >
                  Create Job
                </button>
              </li>
            </ul>
          )}
        </nav>

        {/* Job Modal Component */}
        <CreateJob isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    );
  }

  // If screen is >= 550px, show original desktop design
  return (
    <>
      <nav className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="container mx-auto flex justify-center">
          <ul className="flex items-center space-x-6 text-gray-600">
            {/* Logo */}
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

            {/* Create Job Button */}
            <li>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-purple-600 text-white px-3 py-2 rounded-full font-medium hover:bg-purple-700"
              >
                Create Job
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Job Modal Component */}
      <CreateJob isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;
