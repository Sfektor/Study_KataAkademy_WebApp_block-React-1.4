import './task-list.css'

import Task from "../task";

const TaskList = ({ todos, onDeleted, onToggleDone, editItem, onToggleEdit }) => {

	const elem = todos.map((item) => {
		const {id, ...itemProps} = item;

		return <Task
						key = {id}
						{...itemProps}
						onDeleted = { () => onDeleted(id) }
						onToggleDone = { () => onToggleDone(id) }
						editItem = { editItem }
						onToggleEdit = { () => onToggleEdit(id) }
					/>
	});

	return (
		<section className = "main">
			<ul className = "todo-list" >
				{elem}
			</ul>
		</section>
	);
}

export default TaskList;