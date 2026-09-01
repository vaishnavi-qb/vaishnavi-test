function ActivityList({ activities }) {
  return (
    <ul>
      {activities.map((activity) => (
        <li key={activity.name}>
          <strong>{activity.name}</strong>: {activity.description}
        </li>
      ))}
    </ul>
  )
}

export default ActivityList
