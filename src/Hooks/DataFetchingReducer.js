import axios from "axios";
import React, { useEffect, useReducer } from "react";

const initialState = {
  loading: true,
  post: {},
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        post: action.payload,
        error: "",
      };
    case "FETCH_FAILURE":
      return {
        loading: false,
        post: {},
        error: "Something went wrong",
      };
    default:
      return state;
  }
};

function DataFetchingReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => {
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
        console.log("success" + response.data);
      })
      .catch((error) => {
        dispatch({ type: "FETCH_FAILURE" });
      });
  }, []);
  return (
    <>
      <div>DataFetchingReducer</div>
      {state.loading ? "Loading" : state.post.title}
      {state.error ? state.error : null}
    </>
  );
}

export default DataFetchingReducer;
