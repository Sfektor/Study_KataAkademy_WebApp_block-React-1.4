import PropTypes from 'prop-types'

import './task-list.css'

import Task from '../task'

const TaskList = ({ todos, onDeleted, onToggleDone, getLabel, onToggleEdit, getTimeFromTimer, playPauseTimer }) => {
  const elem = todos.map((item) => {
    const { id, ...itemProps } = item

    return (
      <Task
        key={id}
        {...itemProps}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onToggleEdit={() => onToggleEdit(id)}
        getTimeFromTimer={getTimeFromTimer}
        playPauseTimer={() => playPauseTimer(id)}
        getLabel={getLabel}
      />
    )
  })
  return (
    <section className="main">
      <ul className="todo-list">{elem}</ul>
    </section>
  )
}

TaskList.defaultProps = {
  todos: [{ label: 'Что-то сломалось в TaskList' }],
  onToggleDone: () => console.log('Что-то сломалось в TaskList'),
  onDeleted: () => console.log('Что-то сломалось в TaskList'),
  onToggleEdit: () => console.log('Что-то сломалось в TaskList'),
}

TaskList.propTypes = {
  onToggleDone: PropTypes.func,
  onDeleted: PropTypes.func,
  onToggleEdit: PropTypes.func,
}

export default TaskList
