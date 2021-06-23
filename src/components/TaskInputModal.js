import "./Modals.css";
import React from "react";
import PropTypes from "prop-types";
import { idGenerator } from "../utilityFunctions";
import { Button } from "react-bootstrap";

class TaskInputModal extends React.Component {
    state = {
        value: ""
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
    }

    handleAdd = () => {
        const { value } = this.state;
        if (!value) return;

        const newTask = {
            _id: idGenerator(),
            title: value,
            description: ""
        }
        this.props.addTask(newTask);
        this.setState({ value: "" });
    }

    render() {
        return (
            <div className="mdl-back">
                <div className="mdl-wrapper">
                    <div className="mdl-header">
                        <span className="mdl-info">Add new task</span>
                        <span className="mdl-close-btn">×</span>
                    </div>
                    <div className="mdl-body">
                        akfjdsfdsl
                    </div>
                    <div className="mdl-footer">
                        <Button
                            className="mdl-action-btn"
                            variant="primary"
                        >Add</Button>
                        <Button
                            className="mdl-action-btn"
                            variant="danger"
                        >Cancel</Button>
                    </div>
                </div>
            </div>
        )
    }
}

TaskInputModal.propTypes = {
    addTask: PropTypes.func.isRequired
};

export default TaskInputModal