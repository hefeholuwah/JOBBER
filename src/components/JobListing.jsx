import { FaMapMarker } from "react-icons/fa";
import PropTypes from "prop-types";
import { unescape } from "underscore";

const JobListing = ({ job }) => {
  if (!job) {
    return null; // If job is undefined, return nothing to avoid crashing
  }

  const shortenText = (text) => {
    /* Convert all unicode chars to their textual representation */
    return unescape(text).replaceAll(/&#[\dAFaf]{4};/g,'').slice(0, 100) + '...';
  }

  const numberWithComma = (numStr) => {
    /* Convert number to their commar-formatted pattern */
    return parseInt(numStr).toLocaleString();
  }

  return (
    <div className="bg-white hover:scale-105 rounded-xl shadow-md hover:shadow-lg p-4 relative transition-transform duration-300">
      {/* Company Logo */}
      {job.companyLogo && (
        <img
          src={job.companyLogo}
          alt={`${job.companyName} logo`}
          className="top-4 left-5 w-12 h-12 rounded-full absolute object-cover"
        />
      )}

      <div className="mb-6">
        {/* Company Name */}
        {job.companyName && (
          <div className="text-xl text-gray-600 my-2 font-medium text-center">
            {job.companyName}
          </div>
        )}

        {/* Job Title */}
        <h3 className="text-xl font-bold text-center my-4">
          {unescape(job.jobTitle) || "Job Title Unavailable"}
        </h3>

        {/* Job Type */}
        <div className="mx-auto my-2 bg-yl text-black rounded-full w-fit py-1 px-4">
          {job.jobType && job.jobType.length > 0
            ? job.jobType[0]
            : "Not specified"}
        </div>
      </div>

      {/* Job Excerpt */}
      <p className="text-gray-600 mb-5">
        {shortenText(job.jobExcerpt) || "No job description available"}
      </p>

      {/* Salary */}
      <h4 className="mb-2 font-afacad">
        {job.annualSalaryMin
          ? `${numberWithComma(job.annualSalaryMin)} - ${numberWithComma(job.annualSalaryMax)} ${job.salaryCurrency}`
          : "Not disclosed"}{" "}
        / Year
      </h4>

      <div className="border border-gray-100 mb-5"></div>

      <div className="flex justify-between items-center">
        {/* Job Location */}
        <div className="text-orange-700">
          <FaMapMarker className="inline text-lg mb-1 mr-1 text-start" />
          {job.jobGeo || "Location not available"}
        </div>

        {/* Link to the job URL */}
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="h-[36px] h-full bg-bl hover:bg-indigo-600 text-black font-semibold px-4 py-2 rounded-lg text-center text-sm"
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
    companyName: PropTypes.string,
    companyLogo: PropTypes.string,
    url: PropTypes.string.isRequired,
  }),
};

export default JobListing;
