import { Link } from 'react-router-dom'

function ActivityCard({ name, description, schedule, participants, max_participants }) {
  const spotsLeft = max_participants - participants.length
  const isFull = spotsLeft === 0

  return (
    <div className={`card ${isFull ? 'card-full' : ''}`}>
      <h2 className="card-title">
        <Link to={`/activities/${encodeURIComponent(name)}`}>{name}</Link>
      </h2>
      <p className="card-description">{description}</p>
      <p className="card-schedule">📅 {schedule}</p>
      <p className={`card-spots ${isFull ? 'spots-full' : ''}`}>
        {isFull ? 'Full' : `${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} available`}
      </p>
    </div>
  )
}

export default ActivityCard
