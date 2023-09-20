import './task-filter.css'

const TaskFilter = ({ filter, onFilterChange }) => {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'complited', label: 'Complited' },
  ]

  const button = buttons.map(({ name, label }) => {
    const isActive = filter === name
    let classNameButton = null
    if (isActive) classNameButton = 'selected'

    return (
      <li key={name}>
        <button className={classNameButton} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    )
  })

  return <ul className="filters">{button}</ul>
}

export default TaskFilter
