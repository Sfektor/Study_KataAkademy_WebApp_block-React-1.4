import { Component } from 'react'
import './task-filter.css'

export default class TaskFilter extends Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'complited', label: 'Complited' },
  ]

  render() {
    const { filter, onFilterChange } = this.props

    const buttons = this.buttons.map(({ name, label }) => {
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

    return <ul className="filters">{buttons}</ul>
  }
}
