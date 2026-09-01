import { useState, useEffect } from 'react'
import { fetchActivities } from '../api/activities'

function ActivityList() {
  const [activities, setActivities] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchActivities()
      .then((data) => {
        setActivities(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="error">Error: {error}</p>

  return (
    <ul>
      {Object.entries(activities).map(([name, details]) => (
        <li key={name}>
          <strong>{name}</strong> — {details.description}
          <span> ({details.participants.length}/{details.max_participants} spots)</span>
        </li>
      ))}
    </ul>
  )
}

export default ActivityList
