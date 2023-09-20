import { useState, useEffect, useCallback } from 'react'
import { formatDistanceToNow } from 'date-fns'
import cn from 'classnames'
import './task.css'

const Task = ({
  label,
  timer,
  pauseTimer,
  time,
  getTimeFromTimer,
  onToggleDone,
  onDeleted,
  onToggleEdit,
  playPauseTimer,
  done,
  edit,
  getLabel,
}) => {
  const [labelText, setLabelText] = useState(label)
  const [timeLeft, setTimeLeft] = useState(timer)

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft - minutes * 60

  const loc = useCallback(() => getTimeFromTimer(timeLeft, pauseTimer, time), [timeLeft, pauseTimer])

  useEffect(() => {
    let clearTimer = setInterval(() => {
      pauseTimer && setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0))
    }, 1000)
    loc()
    return () => {
      if (pauseTimer || timeLeft === 0) clearInterval(clearTimer)
    }
  }, [pauseTimer, timeLeft])

  const clickOnElem = (e) => {
    if (e.target.classList.contains('toggle')) {
      onToggleDone()
    }
    if (e.target.classList.contains('icon-destroy')) {
      onDeleted()
    }
    if (e.target.classList.contains('icon-edit')) {
      onToggleEdit()
    }
    if (e.target.classList.contains('icon-play-pause')) {
      playPauseTimer()
    }
  }

  const inptValue = (e) => {
    setLabelText(e.target.value)
    getLabel(e.target.value, time)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    onToggleEdit()
  }

  const onKeyEsc = (e) => {
    if (e.key === 'Escape') onToggleEdit()
  }

  const formChangeClasses = cn({
    ['completed']: done,
    ['editing']: edit,
  })

  let showEditTask = edit ? (
    <PrintEditTask onSubmit={onSubmit} value={labelText} onChange={inptValue} onKeyDown={onKeyEsc} />
  ) : null
  let showTimer = minutes || seconds ? <PrintTimer min={minutes} sec={seconds} /> : null
  let showOverTimer = timer !== null && timer === 0 ? <PrintOverTimer /> : null

  return (
    <>
      <li className={formChangeClasses} onClick={clickOnElem}>
        <div className="view">
          <input className="toggle" type="checkbox" defaultChecked={done} />
          <label>
            <span className="title">{labelText}</span>
            {showTimer}
            {showOverTimer}
            <span className="description">created set {formatDistanceToNow(time, { includeSeconds: true })} ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"></button>
        </div>
        {showEditTask}
      </li>
    </>
  )
}

function PrintTimer({ min, sec }) {
  return (
    <div className="description">
      <button className="icon-play-pause"></button>
      <span>{`${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`}</span>
    </div>
  )
}
function PrintEditTask({ onSubmit, value, onChange, onKeyDown }) {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" className="edit" value={value} onChange={onChange} onKeyDown={onKeyDown} autoFocus />
    </form>
  )
}
function PrintOverTimer() {
  return (
    <b>
      <div className="description">Time is over</div>
    </b>
  )
}

export default Task
