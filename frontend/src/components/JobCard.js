import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { useState } from "react";

// Function to calculate time difference
const getTimeAgo = (createdAt) => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffInMs = now - createdDate;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  return diffInHours < 1
    ? "Just now"
    : diffInHours === 1
    ? "1 hour ago"
    : `${diffInHours} hours ago`;
};

const JobCard = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxDescriptionHeight = 100; // Limit the description height in px

  const toggleDescription = () => setIsExpanded(!isExpanded);

  return (
    <div className="relative bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col h-full justify-between">
      <span className="absolute top-4 right-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
        {getTimeAgo(job.createdAt)}
      </span>

      <div className="flex items-center gap-4">
        {job.logo ? (
          <img src={job.logo} alt="Company Logo" className="w-14 h-14" />
        ) : (
          <div className="w-14 h-14 bg-gray-200 flex items-center justify-center rounded-full">
            <FaBriefcase className="text-gray-500 text-2xl" />
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold">{job.title}</h2>
        <p className="text-gray-600 text-sm">{job.company}</p>
      </div>

      <p className="text-gray-500 flex flex-wrap items-center gap-3 mt-3">
        <span className="flex items-center gap-1">
          <MdWork className="text-gray-600" /> {job.jobType || "N/A"}
        </span>
        <span className="flex items-center gap-1">
          <FaMapMarkerAlt className="text-gray-600" /> {job.location || "N/A"}
        </span>
        <span className="flex items-center gap-1">
          <FaBriefcase className="text-gray-600" /> ₹{job.salaryFrom || "N/A"} -
          ₹{job.salaryTo || "N/A"}
        </span>
      </p>

      {/* Ensuring Description has minimum height */}
      <div className="mt-3 flex-grow" style={{ minHeight: "130px" }}>
        <p
          className={`text-gray-600 text-sm ${
            isExpanded ? "" : "line-clamp-4"
          }`}
          style={{
            maxHeight: isExpanded ? "none" : `100px`,
            overflow: "hidden",
          }}
        >
          {job.description && job.description.trim()
            ? job.description
            : "No description available"}
        </p>
        {job.description && job.description.length > 100 && !isExpanded && (
          <button className="text-blue-500 mt-2" onClick={toggleDescription}>
            Read More
          </button>
        )}
        {isExpanded && (
          <button className="text-blue-500 mt-2" onClick={toggleDescription}>
            Show Less
          </button>
        )}
      </div>

      {/* Button Positioned at the Bottom */}
      <div className="mt-auto">
        <button className="w-full bg-sky-400 text-white py-2 rounded-lg hover:bg-sky-500 transition">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
