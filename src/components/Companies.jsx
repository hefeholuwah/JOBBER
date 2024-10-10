import { useState, useEffect } from "react";
import getJobs from "../services/JobServices";

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Fetch job data and extract company info
    const fetchCompanies = async () => {
      try {
        const response = await getJobs();
        const jobs = Array.isArray(response.jobs) ? response.jobs : []; // Ensure it's an array

        const companyMap = new Map(); // To ensure no duplicates

        // Extract company info from jobs
        jobs.forEach(({ companyName, companyLogo }) => {
          if (!companyMap.has(companyName)) {
            companyMap.set(companyName, {
              name: companyName,
              logo: companyLogo,
            });
          }
        });

        // Convert the map to an array of companies
        setCompanies(Array.from(companyMap.values()));
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <section className="section w-full bg-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Explore Top Companies
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {companies.map((company, index) => (
            <CompanyCard key={index} company={company} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Component to render each company's card
const CompanyCard = ({ company }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
      <div className="p-4 flex flex-col items-center justify-center">
        <img
          src={company.logo}
          alt={company.name}
          className="w-24 h-24 object-cover mb-4 rounded-full border border-gray-200"
        />
        <h2 className="text-xl font-semibold text-gray-800">{company.name}</h2>
      </div>
    </div>
  );
};

export default Companies;
