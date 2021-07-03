import "./SingleTask.css";
import React from "react";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import TaskInputOrEditModal from "../components/TaskInputOrEditModal";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { dateDispalyFormatter } from "../utilityFunctions";

class SingleTask extends React.Component {
  state = {
    task: null,
    onTaskEditMode: false,
    onConfirmDeleteMode: false,
  }

  componentDidMount() {
    const { taskId } = this.props.match.params;
    this.getSingleTask(taskId);
  }

  getSingleTask = (taskId) => {
    fetch(`http://localhost:3001/task/${taskId}`, {
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
        this.setState({ task: result });
      })
      .catch(error => {
        console.log(error);
      })
  }

  deleteTask = () => {
    const { taskId } = this.props.match.params;
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
        this.props.history.push("/");
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
        this.setState({ task: editedTask });
      })
      .catch(error => {
        console.log(error);
      })
  }

  toggleTaskEditMode = () => {
    this.setState({
      onTaskEditMode: !this.state.onTaskEditMode
    })
  }

  toggleConfirmDeleteMode = () => {
    this.setState({
      onConfirmDeleteMode: !this.state.onConfirmDeleteMode
    })
  }

  render() {
    const { task, onTaskEditMode, onConfirmDeleteMode } = this.state;
    if (!task) return <div className="empty-message">task does not exist</div>
    return (
      <div className="SingleTask">
        <Card>
          <Card.Body>
            <Card.Title>{task.title}</Card.Title>
            <Card.Text>
              Description: {task.description || <span className="desc-missing-msg">no description provided</span>}
              </Card.Text>
            <Card.Text>Completion Date: {dateDispalyFormatter(task.date)}</Card.Text>
            <div className="tsk-btns">
              <Button
                variant="warning"
                onClick={this.toggleTaskEditMode}
              ><FontAwesomeIcon icon={faEdit} /></Button>
              <Button
                variant="danger"
                onClick={this.toggleConfirmDeleteMode}
              ><FontAwesomeIcon icon={faTrash} /></Button>
            </div>
          </Card.Body>
        </Card>
        {onTaskEditMode && <TaskInputOrEditModal
          taskToEdit={task}
          toggleTaskInputOrEditMode={this.toggleTaskEditMode}
          editTask={this.editTask}
        />}
        {onConfirmDeleteMode && <ConfirmDeleteModal
          toggleConfirmDeleteMode={this.toggleConfirmDeleteMode}
          taskToDelete={task._id}
          deleteTask={this.deleteTask}
        />}
      </div>

    )
  }
}

export default SingleTask;