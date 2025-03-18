import { FaSearch, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import { useState, useEffect } from "react";

const SearchFilters = ({ onFilterChange }) => {
  const [salary, setSalary] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("Preferred Location");
  const [jobType, setJobType] = useState("Job Type");

  // Handle filter changes and notify parent
  const handleFilterChange = (updatedFilters = {}) => {
    const filters = {
      searchTerm,
      location,
      jobType,
      salary,
      ...updatedFilters, // Ensure the latest updated filter is applied
    };
    console.log("SearchFilters - Applying filters:", filters);
    onFilterChange(filters);
  };

  // Call handleFilterChange on initial render
  useEffect(() => {
    handleFilterChange();
  }, []);

  return (
    <div className="bg-white shadow-md py-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 items-center w-full">
        {/* Search Input */}
        <div className="relative flex items-center w-full">
          <FaSearch className="absolute left-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search By Job Title, Role"
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleFilterChange({ searchTerm: e.target.value });
            }}
          />
        </div>

        {/* Location Dropdown */}
        <div className="relative flex items-center w-full">
          <FaMapMarkerAlt className="absolute left-3 text-gray-500" />
          <select
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            value={location}
            onChange={(e) => {
              const newLocation = e.target.value;
              setLocation(newLocation);
              handleFilterChange({ location: newLocation });
            }}
          >
            <option>Preferred Location</option>
            <option>Bengaluru</option>
            <option>Mumbai</option>
            <option>Remote</option>
            <option>Chennai</option>
            <option>Gurgaon</option>
            <option>San Francisco</option>
            <option>New York</option>
            <option>Pune</option>
            <option>Delhi NCR</option>
            <option>Hyderabad</option>
          </select>
        </div>

        {/* Job Type Dropdown */}
        <div className="relative flex items-center w-full">
          <FaBriefcase className="absolute left-3 text-gray-500" />
          <select
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            value={jobType}
            onChange={(e) => {
              const newJobType = e.target.value;
              setJobType(newJobType);
              handleFilterChange({ jobType: newJobType });
            }}
          >
            <option>Job Type</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
            <option>Contract</option>
          </select>
        </div>

        {/* Salary Range */}
        <div className="flex flex-col w-full">
          <label className="text-gray-600 text-sm font-medium mb-1 flex items-center gap-2">
            Salary Per Month
            <span className="text-gray-700 text-sm font-semibold">
              {salary === 0 ? "Any" : `₹${salary.toLocaleString()}`}
            </span>
          </label>
          <input
            type="range"
            min="0"
            max="100000"
            step="5000"
            value={salary}
            onChange={(e) => {
              const newSalary = Number(e.target.value);
              setSalary(newSalary);
              handleFilterChange({ salary: newSalary });
            }}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
