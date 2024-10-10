import getJobs from "./JobServices";
/*
 * This Job Service provides real-time job data to components that needs it
 */

// Constant RealTimeJobs
export let realTimeJobs: Object;

let intervalId = setInterval(
    async () => {
        try {
            realTimeJobs = await getJobs();
        } catch (error) {
            console.error(error);
            if (error.statusCode === 429) {  // If too many request at a time
                clearInterval(intervalId);   // Stop sending request!
            }
        }
    }, (1000 * 60) * 3  // Fetch jobs in interval of 5 mins
);
