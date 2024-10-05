import { FaMapMarker } from "react-icons/fa";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const JobListing = ({ job }) => {
  if (!job) {
    return null; // If job is undefined, return nothing to avoid crashing
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4 relative">
      <div className="mb-6">
        <h3 className="text-xl font-bold">
          {job.jobTitle || "Job Title Unavailable"}
        </h3>
        <div className="text-gray-600 my-2">
          {job.jobType && job.jobType.length > 0
            ? job.jobType[0]
            : "Not specified"}
        </div>
      </div>

      <p className="text-gray-600 mb-5">
        {job.jobExcerpt || "No job description available"}
      </p>

      <h3 className="text-indigo-500 mb-2">
        {job.annualSalaryMin
          ? `${job.annualSalaryMin} - ${job.annualSalaryMax} ${job.salaryCurrency}`
          : "Not disclosed"}{" "}
        / Year
      </h3>

      <div className="border border-gray-100 mb-5"></div>

      <div className="flex justify-between items-center">
        <div className="text-orange-700">
          <FaMapMarker className="inline text-lg mb-1 mr-1" />
          {job.jobGeo || "Location not available"}
        </div>
        <a
          href={job.url} // Add job.url here
          target="_blank" // Open in new tab
          rel="noopener noreferrer" // Security reasons
          className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

JobListing.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    jobTitle: PropTypes.string,
    jobExcerpt: PropTypes.string,
    annualSalaryMin: PropTypes.number,
    annualSalaryMax: PropTypes.number,
    salaryCurrency: PropTypes.string,
    jobType: PropTypes.array,
    jobGeo: PropTypes.string,
    url: PropTypes.string.isRequired,
  }),
};

export default JobListing;
