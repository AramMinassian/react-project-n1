import "./Modals.css";
import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faTimes } from "@fortawesome/free-solid-svg-icons";

class ConfirmDeleteModal extends React.Component {


  handleSideClick = (e) => {
    if (e.target.className !== "mdl-back") return;
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
            <span
              className="mdl-info"
            ><FontAwesomeIcon icon={faExclamationTriangle} color="#ffc107"/></span>
            <span
              className="mdl-close-btn"
              onClick={toggleConfirmDeleteModal}
            ><FontAwesomeIcon icon={faTimes} /></span>
          </div>
          <div className="mdl-body">
            <p>
              {`Are you sure you want to delete selected task${selectedTasks.size > 1 ? "s" : ""}?`}
            </p>
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