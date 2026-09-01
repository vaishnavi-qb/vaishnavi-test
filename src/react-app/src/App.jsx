import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import ActivityDetailPage from './pages/ActivityDetailPage'

function App() {
  return (
    <div className="app">
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities/:activityName" element={<ActivityDetailPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
