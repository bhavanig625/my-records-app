import React from "react";

const hello = (props) => {
  return (
    <div>
      <h1>
        Hello {props.name} a.k.a {props.hearoName}
      </h1>
      {props.children}
    </div>
  );
};

export default hello;
