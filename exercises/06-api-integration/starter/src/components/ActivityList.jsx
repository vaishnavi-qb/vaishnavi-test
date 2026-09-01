import { useState, useEffect } from 'react'
import { fetchActivities } from '../api/activities'

// Bug 4: no loading state — blank screen during fetch
// Bug 5: no error state — failures are silently swallowed

function ActivityList() {
  const [activities, setActivities] = useState({})

  useEffect(() => {
    fetchActivities().then((data) => setActivities(data))
    // no .catch() — errors disappear
  }, [])

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
