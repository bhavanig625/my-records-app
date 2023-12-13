import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { database } from "./firebase";
import { ref, get } from "firebase/database";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";

export const ChangePassword = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { currentUser } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handlePasswordUpdate(e) {
    e.preventDefault();

    if (!oldPassword) return setError("Please enter old Password");
    else if (!newPassword) return setError("Please enter new password");
    else if (!confirmPassword) return setError("Please confirm password");
    else if (newPassword != confirmPassword)
      return setError("Passwords are not matching");
    try {
      setLoading(true);
      setError("");
      setMessage("");
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        oldPassword
      );

      await reauthenticateWithCredential(currentUser, credential).then(() => {
        updatePassword(currentUser, newPassword);

        setMessage("Password updated successfully");
        setLoading(false);
      });
    } catch (error) {
      setError("Failed to update password");
      console.error("Re-authentication error:", error);
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Change Password</h2>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handlePasswordUpdate}>
            <Form.Group id="password">
              <Form.Label className="mb-1">Current Password</Form.Label>
              <Form.Control
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="new-password" className="mt-3">
              <Form.Label className="mb-1">New Password</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="password-confirm" className="mt-3">
              <Form.Label className="mb-1">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group disabled={loading} id="button" className="mt-3">
              <Button type="submit" className="w-100 mt-3">
                Update Password
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <div className="text-center mt-3">
        <Link to="/home">Cancel</Link>
      </div>
    </div>
  );
};
