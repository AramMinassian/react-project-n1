import React from "react";
import { Col, Card, Button } from "react-bootstrap";

class Task extends React.Component {

  handleDelete = () => {
    const { task, deleteTask } = this.props;
    deleteTask(task._id);
  }

  handleSelect = (e) => {
    const { task, selectTask } = this.props;
    selectTask(task._id);
  }

  render() {
    const { task, onSelectMode, selectedTasks } = this.props;
    return (
      <Col
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={2}>
        <Card className="Task">
          <Card.Body>
            <input
              type="checkbox"
              disabled={!onSelectMode}
              onChange={this.handleSelect} 
              checked={selectedTasks.has(task._id)}/>
            <Card.Title>{task.title}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <Button
              variant="danger"
              onClick={this.handleDelete}
              disabled={onSelectMode}
            >Delete</Button>
          </Card.Body>
        </Card>
      </Col>
    )
  }
}

export default Task