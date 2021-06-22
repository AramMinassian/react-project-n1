import React from "react";
import { Row, Button } from "react-bootstrap";


class ControlButtons extends React.Component {

  render() {
    const { 
      tasks, onSelectMode, toggleSelectMode, selectedTasks, 
      selectAllTasks, deselectAllTasks , deleteSelectedTasks
          } = this.props;
    return (
      <Row>
        <div className="ControlButtons">
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
            onClick={deleteSelectedTasks}
          >Delete</Button>
        </div>
      </Row>
    )
  }
}

export default ControlButtons;