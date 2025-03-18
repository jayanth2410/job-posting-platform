import { useEffect, useState } from "react";
import JobCard from "./JobCard";

const JobListings = ({ jobs: initialJobs, filters }) => {
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    if (!initialJobs || !Array.isArray(initialJobs)) {
      console.log(
        "JobListings - No initial jobs or invalid data:",
        initialJobs
      );
      setFilteredJobs([]);
      return;
    }

    let result = [...initialJobs];

    console.log("JobListings - Applying filters:", filters);
    console.log("JobListings - Initial jobs before filtering:", result);

    // Apply search term filter
    if (filters.searchTerm) {
      result = result.filter((job) =>
        job.title?.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
      console.log("JobListings - After search term filter:", result);
    }

    // Apply location filter
    if (filters.location && filters.location !== "Preferred Location") {
      result = result.filter(
        (job) => job.location?.toLowerCase() === filters.location.toLowerCase()
      );
      console.log("JobListings - After location filter:", result);
    }

    // Apply job type filter
    if (filters.jobType && filters.jobType !== "Job Type") {
      console.log(
        "JobListings - Applying job type filter for:",
        filters.jobType
      );
      result = result.filter((job) => {
        const matchesJobType = job.jobType
          ? job.jobType.toLowerCase() === filters.jobType.toLowerCase()
          : false;
        console.log(
          `JobListings - Checking job: ${job.title}, jobType: ${job.jobType}, matches: ${matchesJobType}`
        );
        return matchesJobType;
      });
      console.log("JobListings - After job type filter:", result);
    } else {
      console.log(
        "JobListings - No job type filter applied (default selected)"
      );
    }

    // Apply salary filter correctly
    if (filters.salary > 0) {
      result = result.filter((job) => {
        const salaryFrom = job.salaryFrom || 0;
        const salaryTo = job.salaryTo || 0;
        return filters.salary <= salaryTo;
      });
      console.log("JobListings - After salary filter:", result);
    }

    setFilteredJobs(result);
  }, [initialJobs, filters]);

  return (
    <div className="container mx-auto px-4 py-6">
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No jobs found.</p>
      )}
    </div>
  );
};

export default JobListings;
