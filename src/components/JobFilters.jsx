const JobFilters = ({ filters, onFilterChange }) => {
  const handleFilterChange = (filterName, value) => {
    onFilterChange(filterName, value);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <select
        className="border rounded p-2"
        value={filters.jobType}
        onChange={(e) => handleFilterChange("jobType", e.target.value)}
      >
        <option value="All">Type of Job</option>
        <option value="full-time">Full-time</option>
        <option value="part-time">Part-time</option>
        <option value="contract">Contract</option>
      </select>

      <select
        className="border rounded p-2"
        value={filters.jobLevel}
        onChange={(e) => handleFilterChange("jobLevel", e.target.value)}
      >
        <option value="All">Job Level</option>
        <option value="Any">Any</option>
        <option value="Senior">Senior</option>
        <option value="Junior">Junior</option>
      </select>

      <select
        className="border rounded p-2"
        value={filters.timePosted}
        onChange={(e) => handleFilterChange("timePosted", e.target.value)}
      >
        <option value="All">Time Posted</option>
        <option value="24h">Last 24 hours</option>
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
      </select>
    </div>
  );
};

export default JobFilters;
