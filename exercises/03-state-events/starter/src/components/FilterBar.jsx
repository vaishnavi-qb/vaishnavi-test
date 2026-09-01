import { useState } from 'react'

function FilterBar({ onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = ['all', 'sports', 'arts', 'academic']

  return (
    <div className="filter-bar">
      {filters.map((filter) => (
        <button
          key={filter}
          className={activeFilter === filter ? 'active' : ''}
          onClick={() => {
            setActiveFilter(filter)
            onFilterChange(filter)
          }}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

export default FilterBar
