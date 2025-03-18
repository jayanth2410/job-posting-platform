const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, required: true },
    salaryFrom: { type: Number, required: true },
    salaryTo: { type: Number, required: true },
    deadline: { type: Date, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "jobDetails" }
);

const Job = mongoose.model("Jobs", jobSchema);
module.exports = Job;
