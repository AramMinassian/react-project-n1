import React from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";


class Todo extends React.Component {
    state = {
        tasks: []
    }

    render() {
        const { tasks } = this.state;

        return (
            <div className="Todo">
                <TaskInput addTask={this.addTask} />
                <TaskList tasks={tasks} />
            </div>
        )
    }

    addTask = (task) => {
        const tasks = [...this.state.tasks, task];
        this.setState({ tasks });
    }
}

export default Todo;