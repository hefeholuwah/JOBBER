import { useState, useEffect } from 'react'
import JobListing from './JobListing'
import JobFilters from './JobFilters'
import Spinner from './Spinner'
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

  if (loading) return <Spinner />
  if (error) return <div className="text-center text-red-500">Error loading jobs: {error.message}</div>

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        <JobFilters filters={filters} onFilterChange={handleFilterChange} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
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