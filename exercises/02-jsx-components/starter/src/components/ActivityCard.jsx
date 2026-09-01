function ActivityCard({ title, description, schedule }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{schedule}</p>
    </div>
  )
}

export default ActivityCard
