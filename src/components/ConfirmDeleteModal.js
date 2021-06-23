import React from "react";
import {Button} from "react-bootstrap";
import "./ConfirmDeleteModal.css";

class Modal extends React.Component {
  render() {
    return (
      <div className="cdm-wrapper">
        <div className="cdm-header">
          <p>Delete tasks</p>
          <span className="cdm-close-btn">x</span>
        </div>
        <div className="cdm-body">
          <p>Are you sure you want to delete selected task?</p>
        </div>
        <div className="cdm-footer">
          <Button variant="primary">Cancel</Button>
          <Button variant="danger">Delete</Button>
        </div>
      </div>
    )
  }
}

export default Modal;