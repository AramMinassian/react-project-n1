import React from "react";
import Task from "./Task";
import { Row } from "react-bootstrap";


class TaskList extends React.Component {
  render() {
    const { tasks, deleteTask, onSelectMode, selectTask, selectedTasks } = this.props;
    const taskList = tasks.map((task) => <Task 
                                            key={task._id} 
                                            task={task} 
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

export default TaskList;