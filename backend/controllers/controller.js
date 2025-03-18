const Job = require("../models/Job");

// Create Job (support both single job and array of jobs)
const createJob = async (req, res) => {
  try {
    let jobs;
    if (Array.isArray(req.body)) {
      // If req.body is an array, use insertMany to save multiple jobs
      jobs = await Job.insertMany(req.body);
      res.status(201).json({ message: "Jobs created successfully", jobs });
    } else {
      // If req.body is a single object, save one job
      const job = new Job(req.body);
      await job.save();
      res.status(201).json({ message: "Job created successfully", job });
    }
  } catch (error) {
    console.error("Error creating job(s):", error); // Log the error for debugging
    res
      .status(500)
      .json({ error: "Error creating job(s)", error: error.message });
  }
};

// Get Jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error); // Log the error for debugging
    res
      .status(500)
      .json({ error: "Error fetching jobs", error: error.message });
  }
};

module.exports = { createJob, getJobs };
