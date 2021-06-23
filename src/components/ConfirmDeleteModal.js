import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import "./Modals.css";

class ConfirmDeleteModal extends React.Component {


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
        className="mdl-back"
        onClick={this.handleSideClick}
      >
        <div className="mdl-wrapper">
          <div className="mdl-header">
            <span>Delete tasks</span>
            <span
              className="mdl-close-btn"
              onClick={toggleConfirmDeleteModal}
            >×</span>
          </div>
          <div className="mdl-body">
            <h4>
              {`Are you sure you want to delete selected task${selectedTasks.size > 1 ? "s" : ""}?`}
            </h4>
          </div>
          <div className="mdl-footer">
            <Button
              className="mdl-action-btn"
              variant="primary"
              onClick={toggleConfirmDeleteModal}
            >Cancel</Button>
            <Button
              className="mdl-action-btn"
              variant="danger"
              onClick={this.handleDelete}
            >Delete</Button>
          </div>
        </div>
      </div>
    )
  }
}

ConfirmDeleteModal.propTypes = {
  toggleConfirmDeleteModal: PropTypes.func.isRequired,
  selectedTasks: PropTypes.object.isRequired,
  deleteSelectedTasks: PropTypes.func.isRequired
}

export default ConfirmDeleteModal;