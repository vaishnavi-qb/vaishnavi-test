// Bug 5: activityName is hardcoded instead of read from the URL parameter

function ActivityDetailPage() {
  const activityName = 'Chess Club'  // should read from URL instead

  return (
    <div>
      <h1>{activityName}</h1>
      <p>Details and signup form for this activity would appear here.</p>
    </div>
  )
}

export default ActivityDetailPage
