import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import JobListings from "./components/JobListings";
import PostJob from "./pages/PostJob";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import SearchFilters from "./components/SearchFilters";

function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    searchTerm: "",
    location: "Preferred Location",
    jobType: "Job Type",
    salary: 50000,
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        if (!response.ok) throw new Error("Failed to fetch jobs");

        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> {/* Add this */}
        {/* Only show SearchFilters when on /jobs */}
        <Route
          path="/jobs"
          element={
            <>
              <SearchFilters onFilterChange={setFilters} />
              <JobListings jobs={jobs} filters={filters} />
            </>
          }
        />
        {/* <Route path="/jobs/:id" element={<JobDetails />} /> */}
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
