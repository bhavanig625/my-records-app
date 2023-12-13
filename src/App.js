// import logo from "./logo.svg";
import "./App.css";
import "./TaskListComponents/Todo.css";
import React, { useReducer } from "react";
import Hello from "./Components/Hello";
import Welcome from "./Components/Welcome";
import Message from "./Components/Message";
import EventBind from "./Components/EventBind";
import ParentComp from "./Components/ParentComp";
import ConditionalUI from "./Components/ConditionalUI";
import Form from "./Components/Form";
import RefsDemo from "./Components/RefsDemo";
import ComponentRef from "./Components/ComponentRef";
import ForwardRefInput from "./Components/ForwardRefInput";
import PortalDemo from "./Components/PortalDemo";
import Hero from "./Components/Hero";
import ErrorBoundary from "./Components/ErrorBoundary";
import TaskList from "./TaskListComponents/TaskList";
//import ComponentA from "./ContextComponents/ComponentA";
import { UserProvider } from "./ContextComponents/UserContext";
import HttpRequestComp from "./Components/HttpRequestComp";
import { Counter } from "./Components/Counter";
import ClassCounter from "./Hooks/ClassCounter";
import HookCounter from "./Hooks/HookCounter";
import HookObject from "./Hooks/HookObject";
import Array from "./Hooks/Array";
import HookMouse from "./Hooks/HookMouse";
import MouseContainer from "./Hooks/MouseContainer";
import DataFetching from "./Hooks/DataFetching";
import ReducerEx1 from "./Hooks/ReducerEx1";
import ComponentA from "./Hooks/ComponentA";
import ComponentB from "./Hooks/ComponentB";
import ComponentC from "./Hooks/ComponentC";
import DataFetchingReducer from "./Hooks/DataFetchingReducer";

function App() {
  return "Hello World!!";

  // const initialState = 0;
  // const reducer = (state, action) => {
  //   switch (action) {
  //     case "increment":
  //       return state + 1;
  //     case "decrement":
  //       return state - 1;
  //     case "reset":
  //       return initialState;
  //     default:
  //       return state;
  //   }
  // };
  // export const CountContext = React.createContext();

  // const [count, dispatch] = useReducer(reducer, initialState);
  // return (
  //   <div>
  //     {" "}
  //     Count - {count}
  //     <CountContext.Provider
  //       value={{ countState: count, countDispatch: dispatch }}
  //     >
  //       <ComponentA />
  //       <ComponentB />
  //       <ComponentC />
  //     </CountContext.Provider>
  {
    /* <HttpRequestComp></HttpRequestComp>
      <UserProvider value="Nanu">
        <ComponentA />
      </UserProvider> */
  }
  {
    /* <EventBind></EventBind> */
  }
  {
    /* <TaskList></TaskList> */
  }
  {
    /* <ErrorBoundary>
        <Hero heroName="Batsman"></Hero>
      </ErrorBoundary>
      <ErrorBoundary> 
        <Hero heroName="SuperMan"></Hero>
      </ErrorBoundary>
      <ErrorBoundary>
        <Hero heroName="Joker"></Hero>
      </ErrorBoundary> */
  }
  {
    /* <PortalDemo></PortalDemo> */
  }
  {
    /* <ForwardRefInput></ForwardRefInput> */
  }
  {
    /* // <ComponentRef></ComponentRef> */
  }
  {
    /* <RefsDemo></RefsDemo> */
  }
  {
    /* <Form></Form> */
  }
  {
    /* <ConditionalUI></ConditionalUI> */
  }
  {
    /* <ParentComp></ParentComp> */
  }
  {
    /* <EventBind></EventBind> */
  }
  {
    /* <Counter></Counter> */
  }
  {
    /* <Message></Message>
      <Hello name="Diana">this is children</Hello>
      <Hello name="Roma"></Hello>
      <Welcome name="Nani">children</Welcome> */
  }
  {
    /* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >     
          Learn React
        </a>
      </header> */
  }
  //</div>
}

export default App;
