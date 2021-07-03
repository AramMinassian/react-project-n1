import "./Modals.css";
import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { deleteTask, deleteSelectedTasks } from "../reduxStore/actions";



class ConfirmDeleteModal extends React.Component {

  // the component works for both single and selected tasks deletion
  // single task deletion is indicated by taskToDelete state variable

  handleSideClick = (e) => {
    if (e.target.className !== "mdl-back") return;
    const { toggleConfirmDeleteMode } = this.props;
    toggleConfirmDeleteMode()
  }

  handleDelete = () => {
    const { deleteSelectedTasks, selectedTaskIds,toggleSelectMode, toggleConfirmDeleteMode, deleteTask, taskToDelete } = this.props;
    if (taskToDelete) {
      deleteTask(taskToDelete)
    } else {
      deleteSelectedTasks(selectedTaskIds);
      toggleSelectMode();
    }
    toggleConfirmDeleteMode();
  }

  render() {
    const { toggleConfirmDeleteMode, selectedTaskIds, taskToDelete } = this.props;

    let deleteModalMessage = "";
    if (taskToDelete) {
      deleteModalMessage = "Are you sure you want to delete the task ?"
    } else {
      deleteModalMessage = `Are you sure you want to delete selected task${selectedTaskIds.size > 1 ? "s" : ""} ?`;
    }

    return (
      <div
        className="mdl-back"
        onClick={this.handleSideClick}
      >
        <div className="mdl-wrapper">
          <div className="mdl-header">
            <span
              className="mdl-info"
            ><FontAwesomeIcon icon={faExclamationTriangle} color="#ffc107" /></span>
            <span
              className="mdl-close-btn"
              onClick={() => toggleConfirmDeleteMode()}
            ><FontAwesomeIcon icon={faTimes} /></span>
          </div>
          <div className="mdl-body">
            <p>{deleteModalMessage}</p>
          </div>
          <div className="mdl-footer">
            <Button
              className="mdl-action-btn"
              variant="danger"
              onClick={this.handleDelete}
            >Delete</Button>
            <Button
              className="mdl-action-btn"
              variant="primary"
              onClick={() => toggleConfirmDeleteMode()}
            >Cancel</Button>
          </div>
        </div>
      </div>
    )
  }
}

ConfirmDeleteModal.propTypes = {
  toggleConfirmDeleteMode: PropTypes.func.isRequired,
  toggleSelectMode: PropTypes.func,
  taskToDelete: PropTypes.string,
  selectedTaskIds: PropTypes.object,
}



const mapDispatchToProps = {
  deleteTask,
  deleteSelectedTasks
}

export default connect(null, mapDispatchToProps)(ConfirmDeleteModal);