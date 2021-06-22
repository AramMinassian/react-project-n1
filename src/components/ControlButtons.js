import React from "react";
import { Row, Col, Button } from "react-bootstrap";


class ControlButtons extends React.Component {


  render() {
    const {tasks, onSelectMode, toggleSelectMode} = this.props;
    return (
      <Row>
        <Col lg="3">
          <Button
            variant="success"
            onClick={toggleSelectMode}
            disabled={!tasks.length}
          >{onSelectMode ? "Cancel" : "Select"}</Button>
        </Col>
        <Col lg="3">
          <Button
            variant="warning"
            disabled={!onSelectMode}
          >Select All</Button>
        </Col>
        <Col lg="3">
          <Button
            variant="danger"
            disabled={!onSelectMode}
          >Delete Selected</Button>
        </Col>
      </Row>
    )
  }
}

export default ControlButtons;