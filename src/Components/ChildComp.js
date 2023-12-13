import React from "react";

function ChildComp(props) {
  return (
    <div>
      <button onClick={() => props.greetHandler("child")}>Greet</button>
    </div>
  );
}

export default ChildComp;
