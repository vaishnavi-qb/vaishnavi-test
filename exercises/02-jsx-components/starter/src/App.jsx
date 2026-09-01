import ActivityCard from './components/ActivityCard'

function App() {
  return (
    // Bug 1: class should be className
    <div class="app">
      <h1>School Activities</h1>
      // Bug 2: two sibling elements returned — need a wrapper or Fragment
      <ActivityCard
        title="Chess Club"
        description="Learn strategies and compete in chess tournaments"
      />
      <ActivityCard
        title="Drama Club"
        description="Practice acting, stagecraft, and performance"
      />
    </div>
  )
}

export default App
