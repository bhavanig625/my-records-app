import React from "react";
import { Plus } from "react-bootstrap-icons";

export const NewButton = (props) => {
  return (
    <>
      <button
        title="Add new record"
        className="btn btn-primary"
        onClick={() => props.handleAddNewRecord()}
      >
        New
        <Plus size={22} />
      </button>
    </>
  );
};
