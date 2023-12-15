import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import googleLogo from "../Images/google-logo.png";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { SignIn, signInWithGoogle } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await SignIn(emailRef.current.value, passwordRef.current.value);
      navigate("/home");
    } catch (e) {
      console.log(e.message);
      if (e.code === "auth/invalid-login-credentials")
        setError("Invalid Login credentials");
      else setError("Failed to login");
    }
    setLoading(false);
  }

  async function handleGoogleSignIn() {
    await signInWithGoogle();
    navigate("/home");
  }

  return (
    <div style={{ maxWidth: "400px", margin: "5% auto" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label className="mb-1">Email</Form.Label>
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>
            <Form.Group className="mt-3" id="password">
              <Form.Label className="mb-1">Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} />
            </Form.Group>
            <Form.Group disabled={loading} id="button">
              <Button type="submit" className="w-100 mt-4">
                Log In
              </Button>
            </Form.Group>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div class="mt-3">
        <div
          class="btn btn-google btn-outline btn-google w-100"
          onClick={handleGoogleSignIn}
        >
          <img
            src={googleLogo}
            alt="Google logo"
            style={{ marginRight: "5px" }}
          />
          Signup Using Google
        </div>
      </div>
      <div className="w-100 text-center mt-3">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
