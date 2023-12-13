import React, { useState, useEffect } from "react";

function HookCounter() {
  const initialCount = 0;
  const [count, setCount] = useState(initialCount);
  const [name, setName] = useState("");
  const IncrementbyFive = () => {
    for (var i = 0; i < 5; i++) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  useEffect(() => {
    console.log("useEffect - Update document title");
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      Count {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        Increment
      </button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>
        Decrement
      </button>
      <button onClick={IncrementbyFive}>Increment by 5</button>
    </div>
  );
}

export default HookCounter;
