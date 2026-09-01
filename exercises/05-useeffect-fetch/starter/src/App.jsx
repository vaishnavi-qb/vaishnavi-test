import { useState, useEffect } from 'react'

// Bug 1: useEffect has no dependency array []
// This means it runs after EVERY render, causing an infinite loop:
//   fetch → setActivities → re-render → fetch → setActivities → ...

function App() {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    fetch('/activities')
      .then((res) => res.json())
      .then((data) => setActivities(Object.entries(data)))
  })  // <-- missing [] here

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
