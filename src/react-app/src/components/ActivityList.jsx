import ActivityCard from './ActivityCard'

function ActivityList({ activities, filter }) {
  const visible = filter === 'all'
    ? activities
    : activities.filter((a) =>
        a.category?.toLowerCase() === filter
      )

  if (visible.length === 0) {
    return <p className="empty-state">No activities match this filter.</p>
  }

  return (
    <div className="activity-grid">
      {visible.map((activity) => (
        <ActivityCard key={activity.name} {...activity} />
      ))}
    </div>
  )
}

export default ActivityList
