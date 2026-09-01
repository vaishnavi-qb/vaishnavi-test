import { useState, useEffect } from 'react'
import ActivityList from '../components/ActivityList'
import { fetchActivities } from '../api/activities'

function HomePage() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchActivities()
        const list = Object.entries(data).map(([name, details]) => ({
          name,
          ...details,
        }))
        setActivities(list)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <p className="status-msg">Loading activities…</p>
  if (error) return <p className="error-msg">Error: {error}</p>

  return (
    <div>
      <h1>Extracurricular Activities</h1>
      <div className="filter-bar">
        {['all', 'sports', 'arts', 'academic'].map((f) => (
          <button
            key={f}
            className={filter === f ? 'active' : ''}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <ActivityList activities={activities} filter={filter} />
    </div>
  )
}

export default HomePage
