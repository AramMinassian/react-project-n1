import React from "react";
import SearchAndFilter from "./SearchAndFilter";
import TaskInputOrEditModal from "./TaskInputOrEditModal";
import TaskList from "./TaskList";
import ControlButtons from "./ControlButtons";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import FilterModal from "./FilterModal";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { getAllTasks } from "../reduxStore/actions";


class Todo extends React.Component {
    state = {
        onTaskInputOrEditMode: false,
        taskToEdit: null,
        taskToDelete: "",
        onSelectMode: false,
        selectedTaskIds: new Set(),
        onConfirmDeleteMode: false,
        onFilterMode: false,
        search: "",
        filterParams: {}
    }

    componentDidMount() {
        this.props.getAllTasks()
    }

    toggleTaskInputOrEditMode = (taskToEdit = null) => {
        this.setState({
            onTaskInputOrEditMode: !this.state.onTaskInputOrEditMode,
            taskToEdit
        })
    }

    toggleConfirmDeleteMode = (taskToDelete = "") => {
        this.setState({
            onConfirmDeleteMode: !this.state.onConfirmDeleteMode,
            taskToDelete
        })
    }

    toggleSelectMode = () => {
        this.setState({
            onSelectMode: !this.state.onSelectMode,
            selectedTaskIds: new Set()
        })

    }

    toggleFilterMode = () => {
        this.setState({
            onFilterMode: !this.state.onFilterMode,
        })
    }

    selectTask = (taskId) => {
        const selectedTaskIds = new Set(this.state.selectedTaskIds);
        if (selectedTaskIds.has(taskId)) {
            selectedTaskIds.delete(taskId);
        } else {
            selectedTaskIds.add(taskId);
        }
        this.setState({ selectedTaskIds });
    }

    selectAllTasks = () => {
        const { tasks } = this.props;
        const selectedTaskIds = new Set(tasks.map(task => task._id));
        this.setState({ selectedTaskIds });
    }

    deselectAllTasks = () => {
        const selectedTaskIds = new Set();
        this.setState({ selectedTaskIds });
    }

    setSearchParams = (newParams) => {
        this.setState({
            search: newParams
        })
    }
    setFilterParams = (newParams) => {
        this.setState({
            filterParams: newParams
        })
    }

    render() {
        const {
            onSelectMode, selectedTaskIds, onConfirmDeleteMode,
            onTaskInputOrEditMode, taskToEdit, taskToDelete, onFilterMode,
            search, filterParams
        } = this.state;

        return (
            <>
                <Container>
                    <SearchAndFilter
                        onSelectMode={onSelectMode}
                        toggleFilterMode={this.toggleFilterMode}
                        setSearchParams={this.setSearchParams}
                        filterParams={filterParams}
                    />
                    <ControlButtons
                        toggleTaskInputOrEditMode={this.toggleTaskInputOrEditMode}
                        toggleSelectMode={this.toggleSelectMode}
                        onSelectMode={onSelectMode}
                        selectedTaskIds={selectedTaskIds}
                        selectAllTasks={this.selectAllTasks}
                        deselectAllTasks={this.deselectAllTasks}
                        toggleConfirmDeleteMode={this.toggleConfirmDeleteMode}
                    />
                    <TaskList
                        toggleTaskInputOrEditMode={this.toggleTaskInputOrEditMode}
                        toggleConfirmDeleteMode={this.toggleConfirmDeleteMode}
                        deleteTask={this.deleteTask}
                        onSelectMode={onSelectMode}
                        selectTask={this.selectTask}
                        selectedTaskIds={selectedTaskIds}
                    />
                </Container>
                {onTaskInputOrEditMode && <TaskInputOrEditModal
                    taskToEdit={taskToEdit}
                    toggleTaskInputOrEditMode={this.toggleTaskInputOrEditMode}
                    isFromSingleTask={false}
                />}
                {onConfirmDeleteMode && <ConfirmDeleteModal
                    toggleConfirmDeleteMode={this.toggleConfirmDeleteMode}
                    toggleSelectMode={this.toggleSelectMode}
                    taskToDelete={taskToDelete}
                    isFromSingleTask={false}
                    selectedTaskIds={selectedTaskIds}
                />}
                {onFilterMode && <FilterModal
                    toggleFilterMode={this.toggleFilterMode}
                    search={search}
                    setFilterParams={this.setFilterParams}
                    filterParams={filterParams}
                />}

            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
}


const mapDispatchToProps = {
    getAllTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);