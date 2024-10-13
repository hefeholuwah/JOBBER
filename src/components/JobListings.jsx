import { useState, useEffect } from 'react'
import JobListing from './JobListing'
import JobFilters from './JobFilters'
import LoadSpinner from './LoadSpinner'
import getJobs from '../services/JobServices'

const JobListings = ({ isHome }) => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    jobType: 'All',
    jobMode: 'All',
    timePosted: 'All'
  })

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs()
        console.log(data) // Verify the structure here
        setJobs(data.jobs || []) // Set jobs only if data.jobs exists
      } catch (error) {
        console.error('Error fetching jobs:', error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  const filteredJobs = jobs.filter(job => {
    return (
      job && job.id &&
      (filters.jobType === 'All' || job.jobType.includes(filters.jobType)) &&
      (filters.jobMode === 'All' || job.jobMode === filters.jobMode) &&
      (filters.timePosted === 'All' || isWithinTimeRange(job.postedAt, filters.timePosted))
    )
  })

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }))
  }

  if (loading) return <LoadSpinner />
  if (error) return <div className="h-full w-full mt-8 text-center text-red-500">Error loading jobs: {error.message}</div>

  return (
    <section className='px-4 py-10 flex flex-col items-center'>
      <div className="container-xl lg:container mt-16">
        <h2 className="text-4xl font-bold text-black mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        <JobFilters filters={filters} onFilterChange={handleFilterChange} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 mx-2">
          {filteredJobs.map((job) => (
            <JobListing key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  )
}

function isWithinTimeRange(date, range) {
  const now = new Date()
  const jobDate = new Date(date)
  const diff = now.getTime() - jobDate.getTime()
  const days = diff / (1000 * 3600 * 24)

  switch (range) {
    case '24h':
      return days <= 1
    case '7d':
      return days <= 7
    case '30d':
      return days <= 30
    default:
      return true
  }
}

export default JobListings