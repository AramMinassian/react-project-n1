import styles from "../styles/ProcessSpinner.module.css"
import React from "react";
import { Spinner } from "react-bootstrap";

class ProcessSpinner extends React.Component {

  componentDidMount(){
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount(){
    document.body.style.overflow = "auto";
  }

  render() {
    return (
      <div className={styles.processSpinnerBg}>
        <Spinner
          role="status"
          variant="primary"
          animation="border"
          className={styles.processSpinner}
        ></Spinner>
      </div>
    )
  }

}

export default ProcessSpinner;
