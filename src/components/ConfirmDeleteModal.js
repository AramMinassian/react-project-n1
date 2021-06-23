import React from "react";
import { Button } from "react-bootstrap";
import "./ConfirmDeleteModal.css";

class Modal extends React.Component {


  handleSideClick = (e) => {
    if (e.target.className !== "cdm-back") return;
    const { toggleConfirmDeleteModal } = this.props;
    toggleConfirmDeleteModal()
  }

  handleDelete = () => {
    const { deleteSelectedTasks, toggleConfirmDeleteModal } = this.props;
    deleteSelectedTasks();
    toggleConfirmDeleteModal();
  }

  render() {
    const { toggleConfirmDeleteModal, selectedTasks } = this.props;
    return (
      <div
        className="cdm-back"
        onClick={this.handleSideClick}
      >
        <div className="cdm-wrapper">
          <div className="cdm-header">
            <span>Delete tasks</span>
            <span
              className="cdm-close-btn"
              onClick={toggleConfirmDeleteModal}
            >×</span>
          </div>
          <div className="cdm-body">
            <h4>
              {`Are you sure you want to delete selected task${selectedTasks.size > 1 ? "s" : ""}?`}
            </h4>
          </div>
          <div className="cdm-footer">
            <Button
              className="btn"
              variant="primary"
              onClick={toggleConfirmDeleteModal}
            >Cancel</Button>
            <Button
              className="btn"
              variant="danger"
              onClick={this.handleDelete}
            >Delete</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;