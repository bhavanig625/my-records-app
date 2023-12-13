import React from "react";

function Task(props) {
  const deleteHandler = () => {
    props.onClick(props.index);
  };
  const completedHandler = () => {
    props.onComplete(props.index);
  };
  return (
    <div key={props.index}>
      <span className={props.status}>{props.value}</span>
      {/* <button className="bi-trash" onClick={this.editHandler}>
        Edit
      </button> */}
      <button onClick={deleteHandler}>
        <i className="bi bi-trash"></i>
        Delete
      </button>
      <button onClick={completedHandler}>Completed</button>
    </div>
  );
}

export default Task;
