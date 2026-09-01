import { useState } from 'react'

// Bug 4: click handler is missing on each button
// The setActiveFilter and onFilterChange exist but are never called

function FilterBar({ onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = ['all', 'sports', 'arts', 'academic']

  return (
    <div className="filter-bar">
      {filters.map((filter) => (
        <button
          key={filter}
          className={activeFilter === filter ? 'active' : ''}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

export default FilterBar
