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
        taskToDelete: "",
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

    componentDidMount() {
        this.getAllTasks()
    }

    getAllTasks = () => {
        fetch("http://localhost:3001/task", {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(async (response) => {
                const result = await response.json();
                if (response.status >= 400 && response.status < 600) {
                    if (result.error) {
                        throw result.error;
                    } else {
                        throw new Error("Something went wrong");
                    }
                }
                this.setState({ tasks: result });
            })
            .catch(error => {
                console.log(error);
            })
    }

    addTask = (task) => {
        fetch("http://localhost:3001/task", {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(async (response) => {
                const result = await response.json();
                if (response.status >= 400 && response.status < 600) {
                    if (result.error) {
                        throw result.error;
                    } else {
                        throw new Error("Something went wrong");
                    }
                }
                const tasks = [...this.state.tasks, result];
                console.log(tasks);
                this.setState({ tasks });
            })
            .catch(error => {
                console.log(error);
            })
    }

    editTask = (editedTask) => {
        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: "PUT",
            body: JSON.stringify(editedTask),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(async (response) => {
                const result = await response.json();
                if (response.status >= 400 && response.status < 600) {
                    if (result.error) {
                        throw result.error;
                    } else {
                        throw new Error("Something went wrong");
                    }
                }
                const tasks = this.state.tasks.map(task => {
                    return (task._id === editedTask._id) ? editedTask : task;
                })
                this.setState({ tasks });
            })
            .catch(error => {
                console.log(error);
            })

    }

    deleteTask = (taskId) => {
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(async (response) => {
                const result = await response.json();
                if (response.status >= 400 && response.status < 600) {
                    if (result.error) {
                        throw result.error;
                    } else {
                        throw new Error("Something went wrong");
                    }
                }
                const tasks = this.state.tasks.filter(task => task._id !== taskId);
                this.setState({ tasks })
            })
            .catch(error => {
                console.log(error);
            })
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

        // backend accepts an array of taskIds
        const body = {
            tasks: [...this.state.selectedTasks]
        }

        fetch(`http://localhost:3001/task`, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(async (response) => {
                const result = await response.json();
                if (response.status >= 400 && response.status < 600) {
                    if (result.error) {
                        throw result.error;
                    } else {
                        throw new Error("Something went wrong");
                    }
                }
                const tasks = this.state.tasks.filter(task => {
                    return !this.state.selectedTasks.has(task._id);
                });
                this.setState({ tasks });
                this.toggleSelectMode();
            })
            .catch(error => {
                console.log(error);
            })

    }

    toggleConfirmDeleteMode = (taskToDelete = "") => {
        this.setState({
            onConfirmDeleteMode: !this.state.onConfirmDeleteMode,
            taskToDelete
        })
    }

    render() {
        const {
            tasks, onSelectMode, selectedTasks, onConfirmDeleteMode,
            onTaskInputOrEditMode, inputOrEditMode, taskToEdit, taskToDelete
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
                        toggleConfirmDeleteMode={this.toggleConfirmDeleteMode}
                    />
                    <TaskList
                        tasks={tasks}
                        toggleTaskInputOrEditMode={this.toggleTaskInputOrEditMode}
                        toggleConfirmDeleteMode={this.toggleConfirmDeleteMode}
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
                    toggleConfirmDeleteMode={this.toggleConfirmDeleteMode}
                    taskToDelete={taskToDelete}
                    deleteTask={this.deleteTask}
                    selectedTasks={selectedTasks}
                    deleteSelectedTasks={this.deleteSelectedTasks}
                />}

            </>



        )
    }
}

export default Todo;