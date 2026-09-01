import ActivityList from './components/ActivityList'
import SignupForm from './components/SignupForm'

const SAMPLE_ACTIVITIES = [
  { name: 'Chess Club', description: 'Learn strategies and compete in chess tournaments' },
  { name: 'Drama Club', description: 'Practice acting, stagecraft, and performance' },
  { name: 'Soccer Team', description: 'Practice teamwork and compete in school matches' },
]

function App() {
  function handleSignup(activityName, email) {
    console.log(`Signing up ${email} for ${activityName}`)
  }

  return (
    <div className="app">
      <h1>School Activities</h1>
      <ActivityList activities={SAMPLE_ACTIVITIES} />
      <SignupForm activityName="Chess Club" onSignup={handleSignup} />
    </div>
  )
}

export default App
