import React from "react";

class Task extends React.Component{
  render(){
    const {task} = this.props;
    return(
      <div className="Task">{task}</div>
    )
  }
}

export default Task;