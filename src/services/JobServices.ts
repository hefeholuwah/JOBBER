import axios from "axios";

const API_URL = "http://localhost:3001/jobs";

const getJobs = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("API response:", response.data); // Log the full response for debugging

    const jobs = response.data.jobs; // Extract the jobs array from the response

    // Check if jobs is an array and has items
    if (!Array.isArray(jobs)) {
      throw new Error("Jobs data is not an array");
    }

    // Count total jobs
    const totalJobs = jobs.length;

    // Count full-time jobs
    const totalFullTime = jobs.filter(
      (job: any) => job.jobType.includes("full-time") // Check if "full-time" exists in the jobType array
    ).length;

    // Count contract jobs
    const totalContract = jobs.filter(
      (job: any) => job.jobType.includes("contract") // Check if "contract" exists in the jobType array
    ).length;

    return { totalJobs, totalFullTime, totalContract, jobs };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export default getJobs;
