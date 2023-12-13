import React from "react";
import { UserConsumer } from "./UserContext";

function ComponentC() {
  return (
    <UserConsumer>
      {(userName) => {
        return <div>Hello {userName}</div>;
      }}
    </UserConsumer>
  );
}

export default ComponentC;
