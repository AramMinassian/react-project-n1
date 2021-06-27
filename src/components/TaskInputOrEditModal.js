import "./Modals.css";
import React from "react";
import PropTypes from "prop-types";
import { Button, FormControl } from "react-bootstrap";
import { dateFormatter } from "../utilityFunctions";

class TaskInputOrEditModal extends React.Component {
    state = {
        title: "",
        description: "",
        date: dateFormatter(new Date()),
        warning: false,
    }

    componentDidMount() {
        const { taskToEdit } = this.props;
        if (taskToEdit) {
            this.setState({
                title: taskToEdit.title,
                description: taskToEdit.description,
                date: dateFormatter(new Date(taskToEdit.date))
            })
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
        if (name === "title") {
            this.setState({
                warning: false,
            })
        }
    }


    // handleAdd and handleEdit methods work similarly but written separately to be more clear

    handleAdd = () => {
        const { title, description } = this.state;
        let date = this.state.date || dateFormatter(new Date());
        const { addTask, toggleTaskInputOrEditMode } = this.props
        if (!title.trim()) {
            this.setState({ warning: true });
            return
        };

        if(new Date(date) < new Date()){
            date = dateFormatter(new Date());
        }

        const newTask = {
            title,
            description,
            date
        }
        addTask(newTask);
        this.setState({
            title: "",
            description: ""
        });
        toggleTaskInputOrEditMode();
    }

    handleEdit = () => {
        const { title, description } = this.state;
        let date = this.state.date || dateFormatter(new Date());
        const { editTask, toggleTaskInputOrEditMode, taskToEdit } = this.props
        if (!title.trim()) {
            this.setState({ warning: true });
            return;
        };

        if(new Date(date) < new Date()){
            date = taskToEdit.date;
        }

        const editedTask = {
            _id: taskToEdit._id,
            title,
            description,
            date
        }
        editTask(editedTask);
        toggleTaskInputOrEditMode();
    }

    render() {
        const { toggleTaskInputOrEditMode, taskToEdit } = this.props;
        const { title, description, date, warning } = this.state;
        return (
            <div className="mdl-back">
                <div className="mdl-wrapper">
                    <div className="mdl-header">
                        <span className="mdl-info">Add new task</span>
                    </div>
                    <div className="mdl-body tsk-input">
                        {warning && <small>task must have a title</small>}
                        <FormControl
                            className="tsk-input-field"
                            placeholder="Title"
                            name="title"
                            value={title}
                            onChange={this.handleChange}
                        />
                        <FormControl
                            className="tsk-textarea-field"
                            as="textarea"
                            placeholder="Description"
                            name="description"
                            value={description}
                            onChange={this.handleChange}
                        />
                        <FormControl
                            type="date"
                            name="date"
                            value={date}
                            min={dateFormatter(new Date())}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="mdl-footer">
                        {taskToEdit ?
                            <Button
                                className="mdl-action-btn"
                                variant="warning"
                                onClick={this.handleEdit}
                            >Edit</Button> :
                            <Button
                                className="mdl-action-btn"
                                variant="primary"
                                onClick={this.handleAdd}
                            >Add</Button>
                        }
                        <Button
                            className="mdl-action-btn"
                            variant="danger"
                            onClick={() => toggleTaskInputOrEditMode()}
                        >Cancel</Button>
                    </div>
                </div>
            </div>
        )
    }
}

TaskInputOrEditModal.propTypes = {
    taskToEdit: PropTypes.object,
    toggleTaskInputOrEditMode: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired
};

export default TaskInputOrEditModal