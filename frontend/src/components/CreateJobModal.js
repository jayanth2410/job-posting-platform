import { useEffect, useState } from "react";
import { Save, ArrowRight } from "lucide-react"; // Import icons

const CreateJobModal = ({ isOpen, onClose, onPublish }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "Internship", // Default to Internship
    salaryFrom: "",
    salaryTo: "",
    deadline: "",
    description: "",
  });

  // Prevent scrolling on the home page when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    for (let key in formData) {
      if (!formData[key]) {
        alert(`Please fill in the ${key} field.`);
        return;
      }
    }

    // Convert salary fields to numbers and prepare payload
    const payload = {
      ...formData,
      salaryFrom: Number(formData.salaryFrom),
      salaryTo: Number(formData.salaryTo),
      deadline: new Date(formData.deadline).toISOString(), // Ensure ISO format for deadline
    };

    try {
      const API_URL =
        process.env.REACT_APP_API_URL ||
        "https://job-posting-platform.onrender.com"; // Configurable API URL
      const response = await fetch(`${API_URL}/api/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Job posted successfully!");
        setFormData({
          title: "",
          company: "",
          location: "",
          jobType: "Internship",
          salaryFrom: "",
          salaryTo: "",
          deadline: "",
          description: "",
        });

        if (onPublish) onPublish(); // Notify parent to refresh jobs
        onClose(); // Close modal
      } else {
        const errorData = await response.json();
        alert(`Error posting job: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert(
        "Failed to connect to the server. Please ensure the backend server is running."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="relative w-7/12 max-h-[80vh] bg-white p-6 rounded-lg shadow-lg flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
        >
          ✖
        </button>

        <h2 className="text-xl font-semibold text-center">
          Create Job Opening
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-4 space-y-4 overflow-y-auto max-h-[70vh] p-2"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Company Name</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option>Internship</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Salary Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="salaryFrom"
                  value={formData.salaryFrom}
                  onChange={handleChange}
                  placeholder="From"
                  className="flex-1 border p-2 rounded"
                  required
                />
                <input
                  type="number"
                  name="salaryTo"
                  value={formData.salaryTo}
                  onChange={handleChange}
                  placeholder="To"
                  className="flex-1 border p-2 rounded"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">
                Application Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Job Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded overflow-auto"
              style={{ resize: "none" }}
              rows="5"
              placeholder="Describe the job role for candidates..."
              required
            ></textarea>
          </div>

          <div className="flex justify-between mt-4">
            {/* Save Draft Button */}
            <button
              type="button"
              className="flex items-center gap-2 border-2 border-black px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100"
              onClick={() => alert("Draft saved (not implemented)")}
            >
              <Save size={18} /> Save Draft
            </button>

            {/* Publish Button */}
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
            >
              Publish <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobModal;
