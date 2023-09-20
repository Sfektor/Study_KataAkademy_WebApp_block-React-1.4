import { useState, useRef } from 'react'
import './new-task-form.css'

const NewTaskForm = ({ addItem }) => {
  const [dataState, setDataState] = useState({
    label: '',
    hours: null,
    min: '',
    sec: '',
  })

  const inputRef = useRef(null)

  const addValueInLabel = (event) => {
    setDataState((dataState) => {
      return {
        ...dataState,
        label: event.target.value,
      }
    })
  }

  const addValueInMin = (event) => {
    if (event.target.value <= 99999) {
      setDataState((dataState) => {
        return {
          ...dataState,
          min: event.target.value,
        }
      })
    }
  }

  const addValueInSec = (event) => {
    if (event.target.value <= 60) {
      setDataState((dataState) => {
        return {
          ...dataState,
          sec: event.target.value,
        }
      })
    }
  }

  const onSubmit = (event) => {
    event.preventDefault()

    if (dataState.label !== '') addItem(dataState.label, dataState.min, dataState.sec)
    setDataState((dataState) => {
      return {
        ...dataState,
        label: '',
        min: '',
        sec: '',
      }
    })
    inputRef.current.focus()
  }

  return (
    <>
      <h1>Todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          className="new-todo"
          id="myInput"
          placeholder="Task"
          autoFocus
          ref={inputRef}
          onChange={addValueInLabel}
          value={dataState.label}
        />
        <input className="new-todo-form__timer" placeholder="Min" onChange={addValueInMin} value={dataState.min} />
        <input
          className="new-todo-form__timer sec"
          placeholder="Sec"
          onChange={addValueInSec}
          value={dataState.sec}
          title="Max 60 sec"
        />
        <button type="submit"></button>
      </form>
    </>
  )
}

export default NewTaskForm
