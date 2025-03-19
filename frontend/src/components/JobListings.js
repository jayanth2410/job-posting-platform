// JobListings Component
import { useEffect, useState } from "react";
import JobCard from "./JobCard";

const JobListings = ({ jobs: initialJobs, filters }) => {
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    if (!initialJobs || !Array.isArray(initialJobs)) {
      setFilteredJobs([]);
      return;
    }

    let result = [...initialJobs];

    if (filters.searchTerm) {
      result = result.filter((job) =>
        job.title?.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.location && filters.location !== "Preferred Location") {
      result = result.filter(
        (job) => job.location?.toLowerCase() === filters.location.toLowerCase()
      );
    }

    if (filters.jobType && filters.jobType !== "Job Type") {
      result = result.filter(
        (job) => job.jobType?.toLowerCase() === filters.jobType.toLowerCase()
      );
    }

    if (filters.salary > 0) {
      result = result.filter((job) => filters.salary <= job.salaryTo);
    }

    setFilteredJobs(result);
  }, [initialJobs, filters]);

  return (
    <div className="container mx-auto px-4 py-6">
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="w-full max-w-full sm:max-w-xs md:max-w-sm lg:max-w-md"
            >
              <JobCard job={job} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No jobs found.</p>
      )}
    </div>
  );
};

export default JobListings;
