/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import './app.css'

import { useState, useEffect } from 'react'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer/footer'

const App = () => {
  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState('all')

  // Создание задачи и присваивание ID
  const createTodoItem = (label, timeTimer) => {
    return {
      label: label,
      done: false,
      edit: false,
      id: Date.now(),
      time: Date.now(),
      timer: timeTimer,
      pauseTimer: false,
    }
  }

  // Добавление задачи в список
  const addItem = (label, min, sec) => {
    let timeTimer = null
    if (min || sec) timeTimer = Number(min) * 60 + Number(sec)
    const newItem = createTodoItem(label, timeTimer)
    const newArrData = [...todoData, newItem]
    addStateInLocalStorage('state', newArrData)
    setTodoData(newArrData)
  }

  // Удаление задачи
  const deleteItem = (id) => {
    const indexElem = todoData.findIndex((el) => id === el.id)
    const newTodoData = todoData.toSpliced(indexElem, 1)
    addStateInLocalStorage('state', newTodoData)
    setTodoData(newTodoData)
  }

  // Для исключения поторний кода (onToggleDone, onToggleEdit, playPauseTimer)
  const toggleProperty = (arr, id, propName) => {
    const indexElem = arr.findIndex((el) => id === el.id)
    const newTodoData = arr.slice(0)
    newTodoData.forEach((el, index) => {
      if (index === indexElem) el[propName] = !el[propName]
      if (propName === 'done' && el[propName]) {
        el.pauseTimer = true
      }
    })
    addStateInLocalStorage('state', newTodoData)
    return newTodoData
  }

  // Отмечаем задачу как выполненую
  const onToggleDone = (id) => {
    setTodoData(toggleProperty(todoData, id, 'done'))
  }

  // Включение и отключение редактирования
  const onToggleEdit = (id) => {
    setTodoData(toggleProperty(todoData, id, 'edit'))
  }

  // фильр по актывным/выполненым задачам
  const onFilterChange = (filter) => {
    setFilter(filter)
  }
  const filterChange = (items, filter) => {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.done)
      case 'complited':
        return items.filter((item) => item.done)
      default:
        return items
    }
  }

  // удаление выполненых задачь
  const clearComlited = () => {
    const newTodoData = todoData.reduce((acc, el) => {
      if (!el.done) acc.push(el)
      return acc
    }, [])
    addStateInLocalStorage('state', newTodoData)
    setTodoData(newTodoData)
  }

  // Установка паузы таймера
  const playPauseTimer = (id) => {
    setTodoData(toggleProperty(todoData, id, 'pauseTimer'))
  }

  // Получение актуального времени таймера (для установки в localStorage)
  const getTimeFromTimer = (timeLeft, pauseTimer, id) => {
    const indexElem = todoData.findIndex((el) => id == el.id)
    const newTodoData = todoData.slice(0)
    newTodoData.forEach((el, index) => {
      if (indexElem === index) {
        el.timer = timeLeft
        el.pauseTimer = pauseTimer
      }
    })
    addStateInLocalStorage('state', newTodoData)
    setTodoData(newTodoData)
  }
  // Получение актуального label (для установки в localStorage)
  const getLabel = (label, id) => {
    const indexElem = todoData.findIndex((el) => id == el.id)
    const newTodoData = todoData.slice(0)
    newTodoData.forEach((el, index) => {
      if (indexElem === index) el.label = label
    })
    addStateInLocalStorage('state', newTodoData)
    setTodoData(newTodoData)
  }

  // Запись в LocalStorage
  const addStateInLocalStorage = (nameKey, nameValue) => {
    localStorage.setItem(nameKey, JSON.stringify(nameValue))
  }
  // Установка state из LocalStorage
  useEffect(() => {
    const rememberMyState = localStorage.getItem('state')
    setTodoData(JSON.parse(rememberMyState) || [])
  }, [])

  const doneCount = todoData.filter((el) => !el.done).length || 0
  const visibleItems = filterChange(todoData, filter)

  return (
    <>
      <NewTaskForm addItem={addItem} />
      <TaskList
        todos={visibleItems}
        onDeleted={deleteItem}
        onToggleDone={onToggleDone}
        onToggleEdit={onToggleEdit}
        getTimeFromTimer={getTimeFromTimer}
        playPauseTimer={playPauseTimer}
        getLabel={getLabel}
      />
      <Footer doneCount={doneCount} clearComlited={clearComlited} filter={filter} onFilterChange={onFilterChange} />
    </>
  )
}

export default App
