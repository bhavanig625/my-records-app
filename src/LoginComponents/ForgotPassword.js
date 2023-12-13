import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ForgotPassword() {
  const emailRef = useRef();
  const { PasswordReset } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();

  async function handlePasswordReset(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await PasswordReset(emailRef.current.value);
      setMessage("Check your inbox for password reset");
    } catch (e) {
      console.log(e.message);
      if (e.code === "auth/missing-email") setError("Please enter your email");
      else setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handlePasswordReset}>
            <Form.Group id="mail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Form.Group disabled={loading} id="button">
              <Button type="submit" className="w-100 mt-3">
                Reset Password
              </Button>
            </Form.Group>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default ForgotPassword;
