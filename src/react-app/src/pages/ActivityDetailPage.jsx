import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import SignupForm from '../components/SignupForm'
import { fetchActivities } from '../api/activities'

function ActivityDetailPage() {
  const { activityName } = useParams()
  const decodedName = decodeURIComponent(activityName)

  const [activity, setActivity] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function loadActivity() {
    try {
      const data = await fetchActivities()
      const found = data[decodedName]
      if (!found) throw new Error(`Activity "${decodedName}" not found`)
      setActivity(found)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadActivity()
  }, [decodedName])

  if (loading) return <p className="status-msg">Loading…</p>
  if (error) return <p className="error-msg">Error: {error}</p>

  return (
    <div className="detail-page">
      <Link to="/" className="back-link">← Back to all activities</Link>
      <h1>{decodedName}</h1>
      <p>{activity.description}</p>
      <p>📅 {activity.schedule}</p>
      <h3>Participants ({activity.participants.length}/{activity.max_participants})</h3>
      {activity.participants.length === 0 ? (
        <p>No one signed up yet — be the first!</p>
      ) : (
        <ul>
          {activity.participants.map((email) => (
            <li key={email}>{email}</li>
          ))}
        </ul>
      )}
      {activity.participants.length < activity.max_participants && (
        <SignupForm activityName={decodedName} onSuccess={loadActivity} />
      )}
    </div>
  )
}

export default ActivityDetailPage
