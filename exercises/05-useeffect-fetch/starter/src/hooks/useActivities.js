import { useState, useEffect } from 'react'

// Bug 2: the useEffect callback is itself async
// React ignores the returned Promise, which can cause unhandled rejections
// and the "Warning: Can't perform a React state update on an unmounted component"

export function useActivities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(async () => {    // <-- async here is the bug
    const res = await fetch('/activities')
    const data = await res.json()
    setActivities(Object.entries(data).map(([name, v]) => ({ name, ...v })))
    setLoading(false)
  }, [])

  return { activities, loading }
}
