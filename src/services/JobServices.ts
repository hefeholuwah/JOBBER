import axios from "axios";

const API_URL = "http://localhost:3001/jobs";

const getJobs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export default getJobs; // Default export
