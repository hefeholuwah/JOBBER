
const JobFilters = ({ filters, setFilters }) => {
    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value
        }))
    }

    return (
        <div className="flex flex-wrap gap-4 mb-6">
            <select
                className="border rounded p-2"
                value={filters.jobType}
                onChange={(e) => handleFilterChange('jobType', e.target.value)}
            >
                <option value="All">Type of Job</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
            </select>

            <select
                className="border rounded p-2"
                value={filters.jobMode}
                onChange={(e) => handleFilterChange('jobMode', e.target.value)}
            >
                <option value="All">Mode of Job</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Onsite">Onsite</option>
            </select>

            <select
                className="border rounded p-2"
                value={filters.timePosted}
                onChange={(e) => handleFilterChange('timePosted', e.target.value)}
            >
                <option value="All">Time Posted</option>
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
            </select>
        </div>
    )
}

export default JobFilters