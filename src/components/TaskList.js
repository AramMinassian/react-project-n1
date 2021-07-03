import React from "react";
import PropTypes from "prop-types";
import Task from "./Task";
import { Row } from "react-bootstrap";
import { connect } from "react-redux";


class TaskList extends React.PureComponent {
  render() {
    const {
      tasks, toggleTaskInputOrEditMode, toggleConfirmDeleteMode,
      onSelectMode, selectTask, selectedTaskIds
    } = this.props;
    const taskList = tasks.map((task) => <Task
      key={task._id}
      task={task}
      toggleTaskInputOrEditMode={toggleTaskInputOrEditMode}
      toggleConfirmDeleteMode={toggleConfirmDeleteMode}
      onSelectMode={onSelectMode}
      selectTask={selectTask}
      selectedTaskIds={selectedTaskIds}
    />);
    if (taskList.length === 0) return <div className="empty-message">no task to show</div>
    return (
      <Row>
        {taskList}
      </Row>
    )
  }
}

TaskList.propType = {
  toggleTaskInputOrEditMode: PropTypes.func.isRequired,
  toggleConfirmDeleteMode: PropTypes.func.isRequired,
  onSelectMode: PropTypes.bool.isRequired,
  selectTask: PropTypes.func.isRequired,
  selectedTaskIds: PropTypes.object.isRequired
}


const mapStateToProps = (state) => {
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps)(TaskList);