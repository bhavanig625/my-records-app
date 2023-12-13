import React, { Component } from "react";
import Input from "./Input";

class ComponentRef extends Component {
  constructor(props) {
    super(props);
    this.componentRef = React.createRef();
  }
  changeHandler = () => {
    this.componentRef.current.focusInput();
  };

  render() {
    return (
      <div>
        <Input ref={this.componentRef} />
        <button onClick={this.changeHandler}>InputFocus</button>
      </div>
    );
  }
}

export default ComponentRef;
