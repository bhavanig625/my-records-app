import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const passwordConfirmRef = useRef();
  const { SignUp } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      firstNameRef.current.value === null ||
      firstNameRef.current.value.trim() === ""
    )
      return setError("Please enter first name");
    else if (passwordRef.current.value !== passwordConfirmRef.current.value)
      return setError("Passwords are not matching");
    else if (
      passwordRef.current.value === null ||
      passwordRef.current.value.trim() === ""
    )
      return setError("Please enter Password");
    else if (
      passwordConfirmRef.current.value === null ||
      passwordConfirmRef.current.value.trim() === ""
    )
      return setError("Please confirm the password");
    //const dataref = ref(database, "User/details/" + firstNameRef.current.value);

    try {
      setError("");
      setLoading(true);
      const userDetails = {
        fname: firstNameRef.current.value,
      };
      await SignUp(
        emailRef.current.value,
        passwordRef.current.value,
        userDetails
      );

      navigate("/home");
    } catch (e) {
      console.log("Error signing up", e);
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="firstName">
              <Form.Label className="mb-1">Name</Form.Label>
              <Form.Control type="text" ref={firstNameRef} />
            </Form.Group>
            {/* <Form.Group id="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" ref={lastNameRef} />
            </Form.Group>
            <Form.Group id="dob">
              <Form.Label>Date of birth</Form.Label>
              <Form.Control type="date" ref={dobRef} />
            </Form.Group> */}
            <Form.Group className="mt-3" id="mail">
              <Form.Label className="mb-1">Email</Form.Label>
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>
            <Form.Group className="mt-3" id="password">
              <Form.Label className="mb-1">Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} />
            </Form.Group>
            <Form.Group className="mt-3" id="password-confirm">
              <Form.Label className="mb-1">Confirm Password</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} />
            </Form.Group>
            <Form.Group disabled={loading} id="button">
              <Button type="submit" className="w-100 mt-4">
                Sign Up
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Signup;
