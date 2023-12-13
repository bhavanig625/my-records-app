import React, { Component } from "react";

export class Counter extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  increment() {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  }

  fiveIncrement() {
    this.increment();
    this.increment();
    this.increment();
    this.increment();
    this.increment();
  }

  render() {
    return (
      <div>
        <div>Counter value - {this.state.count}</div>
        <button onClick={() => this.fiveIncrement()}>Increment</button>
      </div>
    );
  }
}

export default Counter;
