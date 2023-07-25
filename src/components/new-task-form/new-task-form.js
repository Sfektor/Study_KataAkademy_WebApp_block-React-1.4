import './new-task-form.css'

import { Component } from "react";

export default class NewTaskForm extends Component {

	state = {
		label: ''
	}

	inptValue = (e) => {
		this.setState({
			label: e.target.value
		})
	}

	onSubmit = (e) => {
		e.preventDefault()
		if (this.state.label !== '') this.props.addItem(this.state.label)
		this.setState({
			label: ''
		})
	}

	render() {
		return (
			<form className = "header" onSubmit = { this.onSubmit }>
				<h1>Todos</h1>
				<input 
					className = "new-todo" 
					placeholder = "What needs to be done?"
					onChange = { this.inptValue }
					value = { this.state.label }
				/>
			</form>
		);
	}
}