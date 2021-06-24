import React from "react";
import PropTypes from "prop-types";
import { Row, Button } from "react-bootstrap";


class ControlButtons extends React.Component {

  render() {
    const { 
      tasks, onSelectMode, toggleSelectMode, selectedTasks, 
      selectAllTasks, deselectAllTasks , toggleConfirmDeleteModal,
      toggleTaskInputOrEditMode
          } = this.props;
    return (
      <Row>
        <div className="ControlButtons">
        <Button
            variant="primary"
            onClick={() => toggleTaskInputOrEditMode()}
            disabled={onSelectMode}
          >Add Task</Button>
          <Button
            variant="success"
            onClick={toggleSelectMode}
            disabled={!tasks.length}
          >{onSelectMode ? "Cancel" : "Select"}</Button>
          <Button
            variant="warning"
            disabled={!onSelectMode}
            onClick={(selectedTasks.size !== tasks.length) ? selectAllTasks : deselectAllTasks}
          >{(tasks.length === 0 || selectedTasks.size !== tasks.length) ? "Select All" : "Deselect All"}</Button>
          <Button
            variant="danger"
            disabled={!onSelectMode || !selectedTasks.size}
            onClick={toggleConfirmDeleteModal}
          >Delete</Button>
        </div>
      </Row>
    )
  }
}

ControlButtons.propTypes = {
  tasks: PropTypes.array.isRequired,
  toggleTaskInputOrEditMode: PropTypes.func.isRequired,
  toggleSelectMode: PropTypes.func.isRequired,
  onSelectMode: PropTypes.bool.isRequired,
  selectedTasks: PropTypes.object.isRequired,
  selectAllTasks: PropTypes.func.isRequired,
  deselectAllTasks: PropTypes.func.isRequired,
  toggleConfirmDeleteModal: PropTypes.func.isRequired
}

export default ControlButtons;