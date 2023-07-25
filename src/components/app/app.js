import { Component } from 'react';

import './app.css';

import NewTaskForm from "../new-task-form";
import TaskList from '../task-list';
import Footer from '../footer/footer';

export default class App extends Component {

	uniqID = 1;

	state = {
		todoData: [],
		filter: 'all'
	}

// Удаление задачи
	deleteItem = (id) => {
		this.setState(({ todoData }) => {
			const indexElem = todoData.findIndex((el) => id === el.id)
			const newTodoData = todoData.toSpliced(indexElem, 1)
			return {
				todoData: newTodoData
			};
		});
	};

// создание задачи и присваивание ID
	createTodoItem(value) {
		return {
			label: value,
			done: false,
			edit: false,
			id: this.uniqID++
		}
	}
// добавление задачи в список
	addItem = (text) => {
		const newItem = this.createTodoItem(text);
		this.setState(({ todoData }) => {
			const newArrData = [...todoData, newItem]
			return {
				todoData: newArrData
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
	clearComlited = (e) => {
		if (e.target.classList.contains('clear-completed')) {
			this.setState(({todoData}) => {
				const newTodoData = todoData.slice(0)
				newTodoData.forEach((el, index) => {
					if (el.done) newTodoData.splice(index)
				})
	
				return {
					todoData: newTodoData
				}
			})
		}
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