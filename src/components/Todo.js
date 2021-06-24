import React from "react";
import TaskInputOrEditModal from "./TaskInputOrEditModal";
import TaskList from "./TaskList";
import ControlButtons from "./ControlButtons";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { Container } from "react-bootstrap";


class Todo extends React.Component {
    state = {
        tasks: [],
        onTaskInputOrEditMode: false,
        taskToEdit: null,
        onSelectMode: false,
        selectedTasks: new Set(),
        onConfirmDeleteMode: false,
    }

    toggleTaskInputOrEditMode = (taskToEdit = null) => {
        this.setState({
            onTaskInputOrEditMode: !this.state.onTaskInputOrEditMode,
            taskToEdit
        })
    }

    addTask = (task) => {
        const tasks = [...this.state.tasks, task];
        this.setState({ tasks });
    }

    editTask = (editedTask) => {
        const tasks = this.state.tasks.map(task => {
            return (task._id === editedTask._id) ? editedTask : task;
        })
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
        const {
            tasks, onSelectMode, selectedTasks, onConfirmDeleteMode,
            onTaskInputOrEditMode, inputOrEditMode, taskToEdit
        } = this.state;
        return (
            <>
                <Container>
                    <ControlButtons
                        tasks={tasks}
                        toggleTaskInputOrEditMode={this.toggleTaskInputOrEditMode}
                        toggleSelectMode={this.toggleSelectMode}
                        onSelectMode={onSelectMode}
                        selectedTasks={selectedTasks}
                        selectAllTasks={this.selectAllTasks}
                        deselectAllTasks={this.deselectAllTasks}
                        toggleConfirmDeleteModal={this.toggleConfirmDeleteModal}
                    />
                    <TaskList
                        tasks={tasks}
                        toggleTaskInputOrEditMode={this.toggleTaskInputOrEditMode}
                        deleteTask={this.deleteTask}
                        onSelectMode={onSelectMode}
                        selectTask={this.selectTask}
                        selectedTasks={selectedTasks}
                    />
                </Container>
                {onTaskInputOrEditMode && <TaskInputOrEditModal
                    mode={inputOrEditMode}
                    taskToEdit={taskToEdit}
                    toggleTaskInputOrEditMode={this.toggleTaskInputOrEditMode}
                    addTask={this.addTask}
                    editTask={this.editTask}
                />}
                {onConfirmDeleteMode && <ConfirmDeleteModal
                    toggleConfirmDeleteModal={this.toggleConfirmDeleteModal}
                    selectedTasks={selectedTasks}
                    deleteSelectedTasks={this.deleteSelectedTasks}
                />}

            </>



        )
    }
}

export default Todo;