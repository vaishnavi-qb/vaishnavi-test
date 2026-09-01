// Bug 3: props not received — function has no parameters
// Bug 4: class should be className
// Bug 5: title and description are undefined because props aren't destructured
function ActivityCard() {
  return (
    <div class="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

export default ActivityCard
