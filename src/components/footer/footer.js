import './footer.css';

import TaskFilter from "../tasks-filter";

const Footer = ({ doneCount, clearComlited, filter, onFilterChange}) => {

	return (
		<footer className = "footer" onClick = {clearComlited}>
			<span className = "todo-count">{`${doneCount} items left`}</span>
			<TaskFilter 
			filter = { filter }
			onFilterChange = { onFilterChange }/>
			<button className = "clear-completed"> Clear completed</button>
		</footer>
	);
}

export default Footer;