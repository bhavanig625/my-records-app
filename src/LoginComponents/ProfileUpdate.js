import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProfileUpdate() {
  const emailRef = useRef();
  const { currentUser, UpdateUserProfile } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [dataloading, setDataLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    fname: currentUser.displayName,
    email: currentUser.email,
  });
  //const dataref = ref(database, "users/details/" + currentUser.uid);
  //const dataref = ref(database, "users/" + currentUser.uid + "/details");

  // useEffect(() => {
  //   GetData(dataref);
  // }, []);
  // // useEffect(() => {
  // async function GetData() {
  //   await get(dataref)
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         const retrievedData = snapshot.val();
  //         setDataLoading(false);
  //         setUserProfile(retrievedData);
  //       } else {
  //         console.log("No data available at", dataref);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }

  async function handleProfileUpdate(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await UpdateUserProfile(userProfile);
      setMessage("Profile updated successfully");
    } catch (e) {
      setError("Failed to update profile");
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      {dataloading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Update Profile</h2>
              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleProfileUpdate}>
                <Form.Group id="fname">
                  <Form.Label className="mb-1">Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={userProfile?.fname}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, fname: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group id="mail" className="mt-3">
                  <Form.Label className="mb-1">Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    value={currentUser.email}
                    disabled
                  />
                </Form.Group>

                <Form.Group disabled={loading} id="button" className="mt-4">
                  <Button type="submit" className="w-100">
                    Update Profile
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-3">
            <Link to="/home">Cancel</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileUpdate;
