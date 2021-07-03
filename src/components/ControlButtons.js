import React from "react";
import PropTypes from "prop-types";
import { Row, Button } from "react-bootstrap";
import { connect } from "react-redux";


class ControlButtons extends React.PureComponent {

  render() {
    const { 
      tasks, onSelectMode, toggleSelectMode, selectedTaskIds, 
      selectAllTasks, deselectAllTasks , toggleConfirmDeleteMode,
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
            onClick={(selectedTaskIds.size !== tasks.length) ? selectAllTasks : deselectAllTasks}
          >{(tasks.length === 0 || selectedTaskIds.size !== tasks.length) ? "Select All" : "Deselect All"}</Button>
          <Button
            variant="danger"
            disabled={!onSelectMode || !selectedTaskIds.size}
            onClick={() => toggleConfirmDeleteMode()}
          >Delete</Button>
        </div>
      </Row>
    )
  }
}

ControlButtons.propTypes = {
  toggleTaskInputOrEditMode: PropTypes.func.isRequired,
  toggleSelectMode: PropTypes.func.isRequired,
  onSelectMode: PropTypes.bool.isRequired,
  selectedTaskIds: PropTypes.object.isRequired,
  selectAllTasks: PropTypes.func.isRequired,
  deselectAllTasks: PropTypes.func.isRequired,
  toggleConfirmDeleteMode: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps)(ControlButtons);