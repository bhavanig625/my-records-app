import React, { useEffect, useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import { set, update, remove, get, child } from "firebase/database";

function Identity() {
  const numberRef = useRef();
  const [error, setError] = useState();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { dataRef } = useAuth();
  const [userIdentity, setUserIdentity] = useState({
    name: "Aadhaar",
    value: "",
  });

  function InsertData() {
    console.log("Inserting");
    set(dataRef, userIdentity)
      .then(() => {
        setMessage("Data saved successfully.");
      })
      .catch(() => {
        setError("Data could not be saved." + error);
      });
  }

  function UpdateData() {
    userIdentity.value = numberRef.current.value;
    console.log("updated value ", userIdentity.value);
    update(dataRef, userIdentity)
      .then(() => {
        setMessage("Data updated successfully.");
      })
      .catch(() => {
        setError("Data could not be updated." + error);
      });
  }

  function DeleteData() {
    remove(dataRef)
      .then(() => {
        setMessage("Data deleted successfully.");
      })
      .catch(() => {
        setError("Data could not be deleted." + error);
      });
  }

  function GetData() {
    console.log("Getdata", dataRef);
    get(dataRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUserIdentity((prevState) => {
            return {
              ...prevState,
              value: snapshot.val().value,
            };
          });
          setMessage("Fetched value ", snapshot.val().value);
          console.log("Adhar ", snapshot.val().value);
        } else {
          setError("No data found");
        }
      })
      .catch(() => {
        setError("Data could not be deleted." + error);
      });
  }

  useEffect(() => {
    setUserIdentity((prevState) => {
      return {
        ...prevState,
        value: numberRef.current.value,
      };
    });
  }, []);

  async function handleIdentitySubmit(e) {
    e.preventDefault();
    const id = e.target.id;
    console.log(id, e);
    if (numberRef.current.value === null)
      return setError("Enter Identity Number");

    try {
      setError("");
      setMessage("");
      setLoading(true);
      const identityValue = numberRef.current.value;
      console.log("Identity value ", identityValue);
      //   setUserIdentity((prevState) => {
      //     return {
      //       ...prevState,
      //       value: identityValue,
      //     };
      //   });

      if (id === "insertBtn") InsertData();
      else if (id === "updateBtn") UpdateData();
      else if (id === "deleteBtn") DeleteData();
      else if (id === "getBtn") GetData();
    } catch (error) {
      console.log(error);
      setError("Failed to update identity number");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form id="demoForm">
            <Form.Group id="aadhaar">
              <Form.Label>Aadhaar number</Form.Label>
              <Form.Control
                type="text"
                ref={numberRef}
                defaultValue={userIdentity.value}
              />
            </Form.Group>
            <Form.Group disabled={loading} id="button">
              <Button
                onClick={handleIdentitySubmit}
                id="insertBtn"
                type="submit"
                className="w-100 mt-3"
              >
                Insert
              </Button>
              <Button
                onClick={handleIdentitySubmit}
                id="updateBtn"
                type="submit"
                className="w-100 mt-3"
              >
                Update
              </Button>
              <Button
                onClick={handleIdentitySubmit}
                id="deleteBtn"
                type="submit"
                className="w-100 mt-3"
              >
                Remove
              </Button>
              <Button
                onClick={handleIdentitySubmit}
                id="getBtn"
                type="submit"
                className="w-100 mt-3"
              >
                Get
              </Button>
            </Form.Group>
            <Form.Group disabled={loading} id="button"></Form.Group>
            <Form.Group disabled={loading} id="button"></Form.Group>
            <Form.Group disabled={loading} id="button"></Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default Identity;
