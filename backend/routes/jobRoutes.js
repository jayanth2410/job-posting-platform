const express = require("express");
const { createJob, getJobs } = require("../controllers/controller"); // Import controller functions

const router = express.Router();

// GET all jobs
router.get("/", getJobs);

// POST a new job
router.post("/", createJob);



module.exports = router;
