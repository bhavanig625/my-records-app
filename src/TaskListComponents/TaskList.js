import React, { Component } from "react";
import Task from "./Task";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      counter: 1,
      task: "",
    };
    this.todoTextHandler = this.todoTextHandler.bind(this);
    this.addHandler = this.addHandler.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
  }

  todoTextHandler = (event) => {
    this.setState({
      task: event.target.value,
    });
  };
  addHandler(event) {
    const tKey = this.state.counter;
    const tValue = this.state.task;
    const taskObj = { key: tKey, value: tValue, status: "in-progress" };
    let { todoList, todoTask, counter } = this.state;
    this.setState((prevState, props) => ({
      todoList: [...prevState.todoList, taskObj],
      counter: counter + 1,
    }));
  }
  deleteTask(indexToRemove) {
    let filteredList = this.state.todoList.filter(
      (item) => item.key !== indexToRemove
    );
    this.setState({ todoList: filteredList });
  }
  completeTask(indexToCompleted) {
    const updatedList = this.state.todoList.map((item) => {
      if (item.key === indexToCompleted) {
        return { ...item, status: "completed" };
      }
      return item;
    });
    this.setState({ todoList: updatedList });
  }

  render() {
    return (
      <div>
        <h1>TaskList</h1>
        <div>
          <input
            type="text"
            placeholder="Want to do..."
            value={this.todoTask}
            onChange={this.todoTextHandler}
          ></input>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.addHandler}
          >
            Add
          </button>
        </div>
        <div>
          {this.state.todoList.map((item) => (
            <Task
              key={item.key}
              index={item.key}
              value={item.value}
              status={item.status}
              onClick={this.deleteTask}
              onComplete={this.completeTask}
            >
              {item}
            </Task>
          ))}
        </div>
      </div>
    );
  }
}

export default TaskList;
