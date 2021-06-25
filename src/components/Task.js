import React from "react";
import PropTypes from "prop-types";
import { Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

class Task extends React.PureComponent {

  handleSelect = (e) => {
    const { task, selectTask } = this.props;
    selectTask(task._id);
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
        <Card className={`Task ${selectedTasks.has(task._id) ? "Selected" : ""}`}>
          <Card.Body>
            <input
              type="checkbox"
              disabled={!onSelectMode}
              onChange={this.handleSelect}
              checked={selectedTasks.has(task._id)} />
            <Card.Title>{task.title}</Card.Title>
            <Card.Text>Description: {task.description}</Card.Text>
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