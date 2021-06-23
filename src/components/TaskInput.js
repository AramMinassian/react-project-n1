import React from "react";
import PropTypes from "prop-types";
import { idGenerator } from "../utilityFunctions";
import { Row } from "react-bootstrap";

class TaskInput extends React.Component {
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
        const { value } = this.state;
        return (
            <Row style={{ marginBottom: "20px" }}>
                <div>
                    <input
                        type="text"
                        value={value}
                        onChange={this.handleChange} />
                    <button
                        onClick={this.handleAdd} >Add</button>
                </div>

            </Row>
        )
    }
}

TaskInput.propTypes = {
    addTask: PropTypes.func.isRequired
};

export default TaskInput