import { useState, useEffect } from 'react'

function App() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadActivities() {
      const res = await fetch('/activities')
      const data = await res.json()
      setActivities(Object.entries(data))
      setLoading(false)
    }
    loadActivities()
  }, [])

  if (loading) return <p>Loading activities...</p>

  return (
    <div>
      <h1>School Activities</h1>
      <ul>
        {activities.map(([name]) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
