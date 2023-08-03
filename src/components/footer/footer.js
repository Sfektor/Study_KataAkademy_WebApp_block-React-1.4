import PropTypes from 'prop-types';

import './footer.css';

import TaskFilter from "../tasks-filter";

const Footer = ({ doneCount, clearComlited, filter, onFilterChange}) => {

	return (
		<footer className = "footer">
			<span className = "todo-count">{`${doneCount} items left`}</span>
			<TaskFilter 
			filter = { filter }
			onFilterChange = { onFilterChange }/>
			<button className = "clear-completed" onClick = {clearComlited}> Clear completed</button>
		</footer>
	);
}

Footer.defaultProps = {
	onFilterChange: () => {},
}
Footer.propTypes = {
	doneCount: PropTypes.number,
	clearComlited: PropTypes.func,
	filter: PropTypes.string,
	onFilterChange: PropTypes.func,
}

export default Footer;