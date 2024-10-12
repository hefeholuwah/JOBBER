import getJobs from "./JobServices";
/*
 * This Job Service provides real-time job data to components that needs it
 */

// Constant RealTimeJobs
let realTimeJobs: Object;

try {
    realTimeJobs = await getJobs();
} catch (error) {
    console.error(error);
}

const getRealTimeJobs = () => realTimeJobs;
export default getRealTimeJobs;

setInterval(
    async () => {
        try {
            realTimeJobs = await getJobs();
        } catch (error) {
            console.error(error);
        }
    }, (1000 * 60) * 20  // Fetch jobs in interval of 20 mins
);

