import { useState, useEffect } from 'react'

export function useActivities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const res = await fetch('/activities')
      const data = await res.json()
      setActivities(Object.entries(data).map(([name, v]) => ({ name, ...v })))
      setLoading(false)
    }
    load()
  }, [])

  return { activities, loading }
}
