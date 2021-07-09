import styles from "../styles/Modals.module.css";
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
    const { deleteSelectedTasks, selectedTaskIds,toggleSelectMode, toggleConfirmDeleteMode, deleteTask, taskToDelete, isFromSingleTask } = this.props;
    if (taskToDelete) {
      deleteTask(taskToDelete, isFromSingleTask)
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
        className={styles.modalBg}
        onClick={this.handleSideClick}
      >
        <div className={`${styles.modalWrapper} ${styles.deleteModal}`}>
          <div className={styles.modalHeader}>
            <span
              className={styles.modalInfo}
            ><FontAwesomeIcon icon={faExclamationTriangle} color="#ffc107" /></span>
            <span
              className={styles.modalCloseButton}
              onClick={() => toggleConfirmDeleteMode()}
            ><FontAwesomeIcon icon={faTimes} /></span>
          </div>
          <div className={styles.modalBody}>
            <p>{deleteModalMessage}</p>
          </div>
          <div className={styles.modalFooter}>
            <Button
              variant="danger"
              onClick={this.handleDelete}
            >Delete</Button>
            <Button
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
  fromSingleTask: PropTypes.bool,
  selectedTaskIds: PropTypes.object,
}



const mapDispatchToProps = {
  deleteTask,
  deleteSelectedTasks
}

export default connect(null, mapDispatchToProps)(ConfirmDeleteModal);