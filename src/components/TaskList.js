import React from "react";
import Task from "./Task";


class TaskList extends React.Component {
  render() {
    const { tasks } = this.props;
    const taskList = tasks.map((task, i) => <Task key={`task${i}`} task={task} />)
    return (
      <div className="TaskList">
        {taskList}
      </div>
    )
  }
}

export default TaskList;