import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import cn from 'classnames'
import './task.css'
export default class Task extends Component {
  state = {
    label: this.props.label,
    min: Number(this.props.min),
    sec: Number(this.props.sec),
    overTimer: false,
  }

  clearTimer = null

  componentDidMount() {
    this.clearTimer = setInterval(this.tick, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.clearTimer)
  }
  componentDidUpdate() {
    const { overTimer, min, sec } = this.state
    const { pauseTimer } = this.props
    if (overTimer) {
      clearInterval(this.clearTimer)
    }
    this.props.getTimeFromTimer(min, sec, pauseTimer, overTimer, this.props.time)
  }

  tick = () => {
    const { min, sec } = this.state
    const { pauseTimer } = this.props
    if (pauseTimer) return
    if (min === 0 && sec === 0) {
      this.setState({ overTimer: true })
    } else if (sec == 0) {
      this.setState({
        min: min - 1,
        sec: 59,
      })
    } else {
      this.setState({
        min: min,
        sec: sec - 1,
      })
    }
  }

  clickOnElem = (e) => {
    if (e.target.classList.contains('toggle')) {
      this.props.onToggleDone()
    }
    if (e.target.classList.contains('icon-destroy')) {
      this.props.onDeleted()
    }
    if (e.target.classList.contains('icon-edit')) {
      this.props.onToggleEdit()
    }
    if (e.target.classList.contains('icon-play-pause')) {
      this.props.playPauseTimer()
    }
  }

  inptValue = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.editItem(this.state.label, this._reactInternals.key)
    this.props.onToggleEdit()
  }

  onKeyEsc = (e) => {
    if (e.key === 'Escape') this.props.onToggleEdit()
  }

  render() {
    const { done, edit, time } = this.props
    const { min, sec, label, overTimer } = this.state

    const formChangeClasses = cn({
      ['completed']: done,
      ['editing']: edit,
    })

    let showEditTask = edit ? (
      <PrintEditTask onSubmit={this.onSubmit} value={label} onChange={this.inptValue} onKeyDown={this.onKeyEsc} />
    ) : null
    let showTimer = min || sec ? <PrintTimer min={min} sec={sec} /> : null
    let showOverTimer = overTimer ? <PrintOverTimer /> : null

    return (
      <>
        <li className={formChangeClasses} onClick={this.clickOnElem}>
          <div className="view">
            <input className="toggle" type="checkbox" defaultChecked={done} />
            <label>
              <span className="title">{label}</span>
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
