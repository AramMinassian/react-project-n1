import React from "react";

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
        this.props.addTask(value);
        this.setState({ value: "" });
    }

    render() {
        const { value } = this.state;
        return (
            <div className="TaskInput">
                <input
                    type="text"
                    value={value}
                    onChange={this.handleChange} />
                <button
                    onClick={this.handleAdd} >Add</button>
            </div>
        )
    }
}


export default TaskInput