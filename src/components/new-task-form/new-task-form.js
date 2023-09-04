import './new-task-form.css'

import { Component } from 'react'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    hours: null,
    min: '',
    sec: '',
  }

  addValueInLabel = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  addValueInMin = (e) => {
    if (e.target.value <= 99999) {
      this.setState({
        min: e.target.value,
      })
    }
  }

  addValueInSec = (e) => {
    if (e.target.value <= 60) {
      this.setState({
        sec: e.target.value,
      })
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    console.log(e)
    const { label, min, sec } = this.state
    if (label !== '') this.props.addItem(label, min, sec)
    this.setState({
      label: '',
      min: '',
      sec: '',
    })
    const inputFocus = document.getElementById('myInput')
    inputFocus.focus()
  }

  render() {
    return (
      <>
        <h1>Todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            id="myInput"
            placeholder="Task"
            autoFocus
            onChange={this.addValueInLabel}
            value={this.state.label}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={this.addValueInMin}
            value={this.state.min}
          />
          <input
            className="new-todo-form__timer sec"
            placeholder="Sec"
            onChange={this.addValueInSec}
            value={this.state.sec}
            title="Max 60 sec"
            onBlur={(e) => console.log(e)}
          />
          <button type="submit"></button>
        </form>
      </>
    )
  }
}
