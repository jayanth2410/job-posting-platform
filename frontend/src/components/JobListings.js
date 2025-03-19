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
    <div className="w-full px-4 sm:px-0 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 sm:gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} className="w-full" />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No jobs found.
          </p>
        )}
      </div>
    </div>
  );
};

export default JobListings;
