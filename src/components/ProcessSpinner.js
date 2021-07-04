import "./ProcessSpinner.css";
import React from "react";
import { Spinner } from "react-bootstrap";

function ProcessSpinner(){
  return(
    <div className="ProcessSpinner-bg">
      <Spinner
        role="status"
        variant="primary"
        animation="border"
        className="ProcessSpinner"
      ></Spinner>
    </div>
  )
}

export default ProcessSpinner;
