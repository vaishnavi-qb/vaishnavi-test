import ActivityCard from './components/ActivityCard'

function App() {
  return (
    <div className="app">
      <h1>School Activities</h1>
      <>
        <ActivityCard
          title="Chess Club"
          description="Learn strategies and compete in chess tournaments"
          schedule="Fridays, 3:30 PM"
        />
        <ActivityCard
          title="Drama Club"
          description="Practice acting, stagecraft, and performance"
          schedule="Tuesdays, 4:00 PM"
        />
      </>
    </div>
  )
}

export default App
