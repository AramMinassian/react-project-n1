import React from "react";
import PropTypes from "prop-types";
import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { dateDispalyFormatter, truncText } from "../utilityFunctions";

class Task extends React.PureComponent {


  handleSelect = () => {
    const { task, onSelectMode, selectTask } = this.props;
    if(!onSelectMode) return;
    selectTask(task._id)
  }

  render() {
    const {
      task, onSelectMode, selectedTasks, toggleTaskInputOrEditMode,
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
          className={`Task ${selectedTasks.has(task._id) ? "Selected" : ""} ${onSelectMode ? "onSelectMode" : ""}`}
          onClick={this.handleSelect}
        >
          <Card.Body>
            
            <Card.Title>
              {
                onSelectMode ? truncText(task.title) : <Link to={`/task/${task._id}`}>{truncText(task.title)}</Link>
              }
            </Card.Title>
            <Card.Text>
              <span className="tsk-date">
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span>{dateDispalyFormatter(task.date)}</span>
              </span>
            </Card.Text>
            <div className="tsk-btns">
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
  deleteTask: PropTypes.func.isRequired,
  onSelectMode: PropTypes.bool.isRequired,
  selectTask: PropTypes.func.isRequired,
  selectedTasks: PropTypes.object.isRequired
}

export default Task