import styles from "../styles/Task.module.css";
import React from "react";
import PropTypes from "prop-types";
import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCalendarAlt, faCheck, faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import { dateDispalyFormatter, truncText } from "../utilityFunctions";
import { connect } from "react-redux";
import { editTask } from "../reduxStore/actions";

class Task extends React.PureComponent {


  handleSelect = () => {
    const { task, onSelectMode, selectTask } = this.props;
    if (!onSelectMode) return;
    selectTask(task._id)
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
    const {
      task, onSelectMode, selectedTaskIds, toggleTaskInputOrEditMode,
      toggleConfirmDeleteMode
    } = this.props;
    return (
      <Col
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={2}>
        <Card
          className={`${styles.task} ${selectedTaskIds.has(task._id) ? styles.selected : ""} ${onSelectMode ? styles.onSelectMode : ""}`}
          onClick={this.handleSelect}
        >
          <Card.Body>
            <Card.Title>
              {
                onSelectMode ? truncText(task.title) : <Link to={`/task/${task._id}`}>{truncText(task.title)}</Link>
              }
            </Card.Title>
            <Card.Text>
              <span className={styles.taskDate}>
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span>{dateDispalyFormatter(task.date)}</span>
              </span>
              {task.status}
            </Card.Text>
            <div className={styles.taskButtons}>
              {(task.status === "active") ?
                <Button
                  variant="success"
                  disabled={onSelectMode}
                  onClick={() => this.updateStatus("done")}
                ><FontAwesomeIcon icon={faCheck} /></Button> : 
                <Button
                  variant="secondary"
                  disabled={onSelectMode}
                  onClick={() => this.updateStatus("active")}
                ><FontAwesomeIcon icon={faRedoAlt} /></Button> 
              }
              <Button
                variant="warning"
                disabled={onSelectMode}
                onClick={() => toggleTaskInputOrEditMode(task)}
              ><FontAwesomeIcon icon={faEdit} /></Button>
              <Button
                variant="danger"
                onClick={() => toggleConfirmDeleteMode(task._id)}
                disabled={onSelectMode}
              ><FontAwesomeIcon icon={faTrash} /></Button>
            </div>

          </Card.Body>
        </Card>
      </Col>
    )
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  toggleTaskInputOrEditMode: PropTypes.func.isRequired,
  toggleConfirmDeleteMode: PropTypes.func.isRequired,
  onSelectMode: PropTypes.bool.isRequired,
  selectTask: PropTypes.func.isRequired,
  selectedTaskIds: PropTypes.object.isRequired
}

const mapDispatchToProps = {
  editTask
}

export default connect(null, mapDispatchToProps)(Task)


