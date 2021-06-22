import React from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import ControlButtons from "./ControlButtons";
import { Container } from "react-bootstrap";


class Todo extends React.Component {
    state = {
        tasks: [],
        onSelectMode: false
    }

    addTask = (task) => {
        const tasks = [...this.state.tasks, task];
        this.setState({ tasks });
    }

    deleteTask = (taskId) => {
        const tasks = this.state.tasks.filter(task => task._id !== taskId);
        this.setState({ tasks });
    }

    toggleSelectMode = () => {
        this.setState({
            onSelectMode: !this.state.onSelectMode
        })
    }

    render() {
        const { tasks, onSelectMode } = this.state;
        return (
            <Container>
                <TaskInput addTask={this.addTask} />
                <ControlButtons
                    tasks={tasks}
                    toggleSelectMode={this.toggleSelectMode}
                    onSelectMode={onSelectMode}
                />
                <TaskList
                    tasks={tasks}
                    deleteTask={this.deleteTask}
                    onSelectMode={onSelectMode}
                />
            </Container>

        )
    }
}

export default Todo;