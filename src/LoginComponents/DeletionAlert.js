import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { Alert } from "react-bootstrap";

export const DeletionAlert = () => {
  const { deleteStatus, resetDeleteStatus } = useAuth();

  useEffect(() => {
    var timeoutRef = "";
    if (deleteStatus) {
      timeoutRef = setTimeout(() => {
        resetDeleteStatus();
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutRef);
    };
  }, [deleteStatus, resetDeleteStatus]);

  return (
    <>
      {deleteStatus && (
        <Alert variant="danger">Record deleted successfully</Alert>
      )}
    </>
  );
};
