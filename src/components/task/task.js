import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

import './task.css'
export default class Task extends Component {
  state = {
    label: this.props.label,
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

  render() {
    const { label, done, edit, time } = this.props

    let classNameChange = null
    let tagChangeEdit = null
    if (done) classNameChange = 'completed'
    if (edit) {
      classNameChange = 'editing'
      tagChangeEdit = (
        <form onSubmit={this.onSubmit}>
          <input type="text" className="edit" value={this.state.label} onChange={this.inptValue} />
        </form>
      )
    }

    return (
      <>
        <li className={classNameChange} onClick={this.clickOnElem}>
          <div className="view">
            <input className="toggle" type="checkbox" defaultChecked={done} />
            <label>
              <span className="description">{label}</span>
              <span className="created">created {formatDistanceToNow(time, { includeSeconds: true })} ago</span>
            </label>
            <button className="icon icon-edit"></button>
            <button className="icon icon-destroy"></button>
          </div>
          {tagChangeEdit}
        </li>
      </>
    )
  }
}
