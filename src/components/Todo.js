import React from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import ControlButtons from "./ControlButtons";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { Container } from "react-bootstrap";


class Todo extends React.Component {
    state = {
        tasks: [],
        onSelectMode: false,
        selectedTasks: new Set(),
        onConfirmDeleteMode: false,
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
            onSelectMode: !this.state.onSelectMode,
            selectedTasks: new Set()
        })

    }

    selectTask = (taskId) => {
        const selectedTasks = new Set(this.state.selectedTasks);
        if (selectedTasks.has(taskId)) {
            selectedTasks.delete(taskId);
        } else {
            selectedTasks.add(taskId);
        }
        this.setState({ selectedTasks });
    }

    selectAllTasks = () => {
        const { tasks } = this.state;
        const selectedTasks = new Set(tasks.map(task => task._id));
        this.setState({ selectedTasks });
    }

    deselectAllTasks = () => {
        const selectedTasks = new Set();
        this.setState({ selectedTasks });
    }

    deleteSelectedTasks = () => {
        const tasks = this.state.tasks.filter(task => {
            return !this.state.selectedTasks.has(task._id);
        });
        this.setState({ tasks });
        this.toggleSelectMode();
    }

    toggleConfirmDeleteModal = () => {
        this.setState({
            onConfirmDeleteMode: !this.state.onConfirmDeleteMode
        })
    }

    render() {
        const { tasks, onSelectMode, selectedTasks, onConfirmDeleteMode } = this.state;
        return (
            <Container>
                <TaskInput addTask={this.addTask} />
                <ControlButtons
                    tasks={tasks}
                    toggleSelectMode={this.toggleSelectMode}
                    onSelectMode={onSelectMode}
                    selectedTasks={selectedTasks}
                    selectAllTasks={this.selectAllTasks}
                    deselectAllTasks={this.deselectAllTasks}
                    toggleConfirmDeleteModal={this.toggleConfirmDeleteModal}
                />
                <TaskList
                    tasks={tasks}
                    deleteTask={this.deleteTask}
                    onSelectMode={onSelectMode}
                    selectTask={this.selectTask}
                    selectedTasks={selectedTasks}
                />
                {onConfirmDeleteMode && <ConfirmDeleteModal
                                            toggleConfirmDeleteModal={this.toggleConfirmDeleteModal}
                                            selectedTasks={selectedTasks}
                                            deleteSelectedTasks={this.deleteSelectedTasks}
                                        />}
            </Container>

        )
    }
}

export default Todo;