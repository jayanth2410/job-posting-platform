import { Info } from "lucide-react";

const About = () => {
  return (
    <div className="container mx-auto px-6 mt-12">
      <div className="flex items-center gap-2 text-3xl font-bold text-blue-600">
        <Info size={36} /> About Us
      </div>
      <p className="mt-4 text-lg text-gray-600 max-w-3xl">
        Welcome to our job posting platform! We connect talented individuals
        with top companies, making job search and hiring easier and more
        efficient. Our mission is to bridge the gap between employers and job
        seekers, helping everyone find the perfect opportunity.
      </p>
    </div>
  );
};

export default About;
