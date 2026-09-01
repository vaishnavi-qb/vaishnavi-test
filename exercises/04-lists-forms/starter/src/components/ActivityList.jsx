// Bug 1: missing key prop on each <li>
// React will log: "Each child in a list should have a unique 'key' prop."

function ActivityList({ activities }) {
  return (
    <ul>
      {activities.map((activity) => (
        <li>
          <strong>{activity.name}</strong>: {activity.description}
        </li>
      ))}
    </ul>
  )
}

export default ActivityList
