import { Component } from 'react'

import './app.css'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer/footer'

export default class App extends Component {
  state = {
    todoData: [],
    filter: 'all',
  }

  // создание задачи и присваивание ID
  createTodoItem(label, min, sec) {
    return {
      label: label,
      done: false,
      edit: false,
      id: Date.now(),
      time: Date.now(),
      min: min,
      sec: sec,
      pauseTimer: true,
      overTimer: false,
    }
  }

  // Удаление задачи
  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const indexElem = todoData.findIndex((el) => id === el.id)
      const newTodoData = todoData.toSpliced(indexElem, 1)
      this.addStateInLocalStorage('state', newTodoData)
      return {
        todoData: newTodoData,
      }
    })
  }

  // добавление задачи в список
  addItem = (label, min, sec) => {
    const newItem = this.createTodoItem(label, min, sec)
    this.setState(({ todoData }) => {
      const newArrData = [...todoData, newItem]
      this.addStateInLocalStorage('state', newArrData)
      return {
        todoData: newArrData,
      }
    })
  }

  // для исключения поторний кода
  toggleProperty(arr, id, propName) {
    const indexElem = arr.findIndex((el) => id === el.id)
    const newTodoData = arr.slice(0)
    newTodoData.forEach((el, index) => {
      if (index === indexElem) el[propName] = !el[propName]
      if (propName === 'done' && el[propName]) {
        el.pauseTimer = true
      }
    })
    this.addStateInLocalStorage('state', newTodoData)
    return newTodoData
  }

  playPauseTimer = (id) => {
    // const { pauseTimer } = this.props
    // this.setState({ pauseTimer: !pauseTimer })
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'pauseTimer'),
      }
    })
  }

  // отмечаем задачу как выполненую
  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      }
    })
  }

  // редактирование
  editItem = (text, id) => {
    this.setState(({ todoData }) => {
      const indexElem = todoData.findIndex((el) => id == el.id)
      const newTodoData = todoData.slice(0)
      newTodoData.forEach((el, index) => {
        if (indexElem === index) el.label = text
      })

      return {
        todoData: newTodoData,
      }
    })
  }
  // Включение и отключение редактирования
  onToggleEdit = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'edit'),
      }
    })
  }

  // удаление выполненых задачь
  clearComlited = () => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.reduce((acc, el) => {
        if (!el.done) acc.push(el)
        return acc
      }, [])

      this.addStateInLocalStorage('state', newTodoData)
      return {
        todoData: newTodoData,
      }
    })
  }

  // фильр по актывным/выполненым задачам
  filter(items, filter) {
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
  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  getTimeFromTimer = (min, sec, pauseTimer, overTimer, id) => {
    this.setState(({ todoData }) => {
      const indexElem = todoData.findIndex((el) => id == el.id)
      const newTodoData = todoData.slice(0)
      newTodoData.forEach((el, index) => {
        if (indexElem === index) {
          el.min = min
          el.sec = sec
          el.pauseTimer = pauseTimer
          el.overTimer = overTimer
        }
      })
      this.addStateInLocalStorage('state', newTodoData)
    })
  }

  // Запись в LocalStorage
  addStateInLocalStorage(nameKey, nameValue) {
    localStorage.setItem(nameKey, JSON.stringify(nameValue))
  }
  // Установка state из LocalStorage
  componentDidMount() {
    const rememberMyState = localStorage.getItem('state')
    this.setState(() => {
      return {
        todoData: JSON.parse(rememberMyState) || [],
      }
    })
  }

  render() {
    const doneCount = this.state.todoData.filter((el) => !el.done).length
    const visibleItems = this.filter(this.state.todoData, this.state.filter)
    return (
      <>
        <NewTaskForm addItem={this.addItem} />
        <TaskList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          editItem={this.editItem}
          onToggleDone={this.onToggleDone}
          onToggleEdit={this.onToggleEdit}
          time={this.state.time}
          getTimeFromTimer={this.getTimeFromTimer}
          playPauseTimer={this.playPauseTimer}
        />
        <Footer
          doneCount={doneCount}
          clearComlited={this.clearComlited}
          filter={this.state.filter}
          onFilterChange={this.onFilterChange}
        />
      </>
    )
  }
}
