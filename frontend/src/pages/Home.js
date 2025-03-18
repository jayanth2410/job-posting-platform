import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      {/* Welcome Image
      <img src="/logo.png" alt="Welcome" className="w-full max-w-lg mb-6" /> */}

      {/* Welcome Text */}
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Find Your Dream Job Today!
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        Browse thousands of job opportunities and start your career journey.
      </p>

      {/* Find Jobs Button */}
      <Link
        to="/jobs"
        className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-md hover:bg-purple-700 transition"
      >
        Find Jobs
      </Link>
    </div>
  );
}

export default Home;
