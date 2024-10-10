import { Link } from "react-router-dom";
import Card from "./Card";
import { devTypes } from "../utils";
import { realTimeJobs } from "../services/RealTimeJobService";

const DevTypeCards = () => {
  return (
    <section className="w-full flex flex-col items-center py-4 my-9">
      <h1 className="text-4xl font-bold my-8">Browse by Tech Stack</h1>
      <div className="container-xl lg:container">
        <div className="flex flex-wrap justify-evenly items-align gap-6 p-4 rounded-lg">
          {devTypes.map(({ name, keyWords, imgBase64 }) => (
            <Card style="flex justify-between card" key={name}>
              <img src={imgBase64} alt={name} width="50px" />
              <div className="ml-2 flex flex-col justify-center items-center p-1">
                <h1 className="text-xl">{name}</h1>
                <small className="font-semibold">
                  {getJobsByTitle(name).length} jobs available
                </small>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Function to get jobs by matching the title (e.g., card name)
const getJobsByTitle = (title) => {
  const jobs = realTimeJobs?.jobs || []; // Ensure jobs are present
  const lowerCaseTitle = title.toLowerCase(); // Convert card title to lowercase for matching

  // Filter jobs where the job title contains the card title (case-insensitive)
  return jobs.filter(({ jobTitle }) =>
    jobTitle.toLowerCase().includes(lowerCaseTitle)
  );
};

export default DevTypeCards;
