import "./SingleTask.css";
import React from "react";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import TaskInputOrEditModal from "../components/TaskInputOrEditModal";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { dateDispalyFormatter } from "../utilityFunctions";
import { connect } from "react-redux";
import { getSingleTask, deleteTask } from "../reduxStore/actions";

class SingleTask extends React.Component {
  state = {
    onTaskEditMode: false,
    onConfirmDeleteMode: false,
  }

  componentDidMount() {
    const { taskId } = this.props.match.params;
    this.props.getSingleTask(taskId);
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
    const { onTaskEditMode, onConfirmDeleteMode } = this.state;
    const { task } = this.props;
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
          isFromSingleTask={true}
        />}
        {onConfirmDeleteMode && <ConfirmDeleteModal
          toggleConfirmDeleteMode={this.toggleConfirmDeleteMode}
          taskToDelete={task._id}
          isFromSingleTask={true}
        />}
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    task: state.task
  }
}

const mapDispatchToProps = {
  getSingleTask,
  deleteTask
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);