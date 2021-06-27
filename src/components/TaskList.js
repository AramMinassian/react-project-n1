import React from "react";
import PropTypes from "prop-types";
import Task from "./Task";
import { Row } from "react-bootstrap";


class TaskList extends React.PureComponent {
  render() {
    const { 
      tasks, toggleTaskInputOrEditMode, toggleConfirmDeleteMode, deleteTask, 
      onSelectMode, selectTask, selectedTasks 
          } = this.props;
    const taskList = tasks.map((task) => <Task 
                                            key={task._id} 
                                            task={task} 
                                            toggleTaskInputOrEditMode={toggleTaskInputOrEditMode}
                                            toggleConfirmDeleteMode={toggleConfirmDeleteMode}
                                            deleteTask={deleteTask}
                                            onSelectMode={onSelectMode}
                                            selectTask={selectTask}
                                            selectedTasks={selectedTasks}
                                          />)
    return (
      <Row>
        {taskList}
      </Row>
    )
  }
}

TaskList.propType = {
  tasks: PropTypes.array.isRequired,
  toggleTaskInputOrEditMode: PropTypes.func.isRequired,
  toggleConfirmDeleteMode: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  onSelectMode: PropTypes.bool.isRequired,
  selectTask: PropTypes.func.isRequired,
  selectedTasks: PropTypes.object.isRequired
}

export default TaskList;