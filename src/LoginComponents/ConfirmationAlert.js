import React from "react";
import { Alert, Button } from "react-bootstrap";

export const ConfirmationAlert = ({ show, onConfirm, onCancel }) => {
  return (
    <Alert show={show} variant="warning">
      <Alert.Heading>Confirm Deletion</Alert.Heading>
      <p>Are you sure you want to delete this record?</p>
      <hr />
      <div className="d-flex justify-content-between">
        <Button onClick={onCancel} variant="outline-secondary">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="danger">
          Delete
        </Button>
      </div>
    </Alert>
  );
};
