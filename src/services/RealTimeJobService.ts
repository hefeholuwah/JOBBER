import getJobs from "./JobServices";

/*
 * This Job Service provides real-time job data to components that need it
 */

// Constant RealTimeJobs
export let realTimeJobs: { jobs: any[] } = { jobs: [] }; // Initialize with an empty jobs array

let intervalId = setInterval(
  async () => {
    try {
      const jobData = await getJobs(); // Fetch jobs
      realTimeJobs = jobData; // Set realTimeJobs to fetched job data
    } catch (error) {
      console.error(error);
      if (error.statusCode === 429) {
        // If too many requests at a time
        clearInterval(intervalId); // Stop sending requests
      }
    }
  },
  1000 * 60 * 3 // Fetch jobs at intervals of 3 minutes
);
