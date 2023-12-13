import React, { Component } from "react";

export class ConditionalUI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: true,
    };
  }

  render() {
    return this.state.isLoggedIn && <div>Welcome Nanu</div>;
    // return this.state.isLoggedIn ? (
    //   <div>Welcome Nanu</div>
    // ) : (
    //   <div>Welcome Guest</div>
    // );
    // let message;
    // if (this.state.isLoggedIn) {
    //   message = <div>Welcome Nanu</div>;
    // } else {
    //   message = <div>Welcome Guest</div>;
    // }
    // return <div>{message}</div>;
    // if (this.state.isLoggedIn) {
    //   return <div>Welcome Nanu</div>;
    // } else {
    //   return <div>Welcome Guest</div>;
    // }
  }
}

export default ConditionalUI;
