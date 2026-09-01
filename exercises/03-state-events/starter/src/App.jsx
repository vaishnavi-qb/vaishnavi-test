import { useState } from 'react'
import LikeButton from './components/LikeButton'
import FilterBar from './components/FilterBar'

function App() {
  const [activeFilter, setActiveFilter] = useState('all')

  return (
    <div className="app">
      <h1>School Activities</h1>

      <LikeButton />

      <FilterBar onFilterChange={setActiveFilter} />

      {/* Conditional rendering: show message only when sports is active */}
      {activeFilter === 'sports' && (
        <p>Showing sports activities only</p>
      )}
    </div>
  )
}

export default App
