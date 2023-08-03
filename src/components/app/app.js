import { Component } from 'react';


import './app.css';

import NewTaskForm from "../new-task-form";
import TaskList from '../task-list';
import Footer from '../footer/footer';

export default class App extends Component {

	state = {
		todoData: [],
		filter: 'all',
	}

	// создание задачи и присваивание ID
	createTodoItem(value) {
		const count = this.state.todoData.length
		return {
			label: value,
			done: false,
			edit: false,
			id: count + 1,
			time: Date.now()
		}
	}

// Удаление задачи
	deleteItem = (id) => {
		this.setState(({ todoData }) => {
			const indexElem = todoData.findIndex((el) => id === el.id)
			const newTodoData = todoData.toSpliced(indexElem, 1)
			this.addStateInLocalStorage('state', newTodoData)
			return {
				todoData: newTodoData
			};
		});
	};

// добавление задачи в список
	addItem = (text) => {
		const newItem = this.createTodoItem(text);
		this.setState(({ todoData }) => {
			const newArrData = [...todoData, newItem]
			this.addStateInLocalStorage('state', newArrData)
			return {
				todoData: newArrData,
			}
		})
	}

// для исключение поторний кода
	toggleProperty(arr, id, propName) {
		const indexElem = arr.findIndex((el) => id === el.id);
		const newTodoData = arr.slice(0);
		newTodoData.forEach((el, index) => {
			if (index === indexElem) el[propName] = !el[propName]
		});
		this.addStateInLocalStorage('state', newTodoData)
		return newTodoData;
	}

// отмечаем задачу как выполненую
	onToggleDone = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'done')
			}
		});
	};

// редактирование
	editItem = (text, id) => {
		this.setState(({ todoData }) => {
			const indexElem = todoData.findIndex((el) => id == el.id)
			const newTodoData = todoData.slice(0)
			newTodoData.forEach((el, index) => {
				if (indexElem === index) el.label = text
			})

			return {
				todoData: newTodoData
			}
		})
	}
// Включение и отключение редактирования
	onToggleEdit = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'edit')
			}
		});
	}

// удаление выполненых задачь
	clearComlited = () => {
		this.setState(({todoData}) => {
			const newTodoData = todoData.reduce((acc, el) => {
				if (!el.done) acc.push(el)
				return acc
			}, [])

			this.addStateInLocalStorage('state', newTodoData)
			return {
				todoData: newTodoData
			}
		})
	}

// фильр по актывным/выполненым задачам
	filter(items, filter) {
		switch (filter) {
			case 'all':
				return items;
			case 'active':
				return items.filter((item) => !item.done);
			case 'complited':
				return items.filter((item) => item.done)
			default:
				return items
		}
	}
	onFilterChange = (filter) => {
		this.setState({filter})
	}

// Запись в LocalStorage
	addStateInLocalStorage(nameKey, nameValue) {
		localStorage.setItem(nameKey, JSON.stringify(nameValue))
	}
// Установка state из LocalStorage
	componentDidMount() {
		const rememberMyState = localStorage.getItem('state');
		this.setState(({ todoData }) => {
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
				<NewTaskForm addItem = { this.addItem }/>
				<TaskList 
					todos = { visibleItems }
					onDeleted = { this.deleteItem }
					editItem = { this.editItem }
					onToggleDone = { this.onToggleDone }
					onToggleEdit = { this.onToggleEdit }
					time = { this.state.time }
				/>
				<Footer
					doneCount = { doneCount }
					clearComlited = { this.clearComlited }
					filter = { this.state.filter }
					onFilterChange = { this.onFilterChange }
				/>
			</>
		);
	}
}