import styles from "../styles/SingleTask.module.css"
import React from "react";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import TaskInputOrEditModal from "../components/TaskInputOrEditModal";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faRedoAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import { dateDispalyFormatter } from "../utilityFunctions";
import { connect } from "react-redux";
import { getSingleTask, deleteTask, editTask } from "../reduxStore/actions";

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

  updateStatus = (status) => {
    const { task, editTask } = this.props;
    editTask({
      ...task,
      date: task.date.slice(0, 10),
      status
    }, true)
  }


  render() {
    const { onTaskEditMode, onConfirmDeleteMode } = this.state;
    const { task } = this.props;
    if (!task) return <div className="empty-message">task does not exist</div>
    return (
      <div className={styles.singleTask}>
        <Card>
          <Card.Body>
            <Card.Title>{task.title}</Card.Title>
            <Card.Text>
              Description: {task.description || <span className="empty-message">no description provided</span>}
            </Card.Text>
            <Card.Text>Completion Date: {dateDispalyFormatter(task.date)}</Card.Text>
            <div>
              {(task.status === "active") ?
                <Button
                  variant="success"
                  onClick={() => this.updateStatus("done")}
                ><FontAwesomeIcon icon={faCheck} /></Button> :
                <Button
                  variant="secondary"
                  onClick={() => this.updateStatus("active")}
                ><FontAwesomeIcon icon={faRedoAlt} /></Button>
              }
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
  deleteTask,
  editTask
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);