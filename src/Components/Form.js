import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      comments: "",
      topic: "react",
    };
  }

  usernameChangeHandler = (event) => {
    this.setState({ username: event.target.value });
  };
  commentChangeHandler = (event) => {
    this.setState({ comments: event.target.value });
  };
  topicChangeHandler = (event) => {
    this.setState({ topic: event.target.value });
  };
  submitHandler = (event) => {
    alert(
      `${this.state.username}   ${this.state.comments}  ${this.state.topic}`
    );
    event.preventDefault();
  };

  render() {
    const { username, comments, topic } = this.state;
    return (
      <form onSubmit={this.submitHandler}>
        <div>
          <label>Username </label>
          <input
            type="text"
            value={username}
            onChange={this.usernameChangeHandler}
          ></input>
        </div>
        <div>
          <label>Comments </label>
          <textarea
            value={comments}
            onChange={this.commentChangeHandler}
          ></textarea>
        </div>
        <div>
          <lable>Topic </lable>
          <select value={topic} onChange={this.topicChangeHandler}>
            <option value="react">React</option>
            <option value="angular">Angular</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}

export default Form;
