import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import { database } from "./firebase";
import { ref } from "firebase/database";
import { v4 as uuid4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { RecordForm } from "./RecordForm";

export const NewRecord = () => {
  const formTitle = "New Record";
  const uuid = uuid4();
  const navigate = useNavigate();
  const { currentUser, UpdateData } = useAuth();
  const [error, setError] = useState();
  //const [setLoading] = useState(false);
  const [userMessage, setUserMessage] = useState();
  const dataref = ref(
    database,
    "users/" + currentUser.uid + "/records/" + uuid
  );

  const createNewRecord = (finalRecord) => {
    try {
      setError("");

      UpdateData(dataref, finalRecord)
        .then((successMessage) => {
          setUserMessage(successMessage);
          navigate("/record-details/" + uuid);
        })
        .catch((error) => {
          setError("Data could not be created. ");
          console.log(error);
        });

      //setLoading(false);
    } catch (e) {
      setError("Error creating record");
      console.log("Error updating data", e);
    }
  };

  return (
    <div>
      {userMessage && <Alert variant="success">{userMessage}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <RecordForm formTitle={formTitle} onSubmit={createNewRecord} />
    </div>
  );
};
