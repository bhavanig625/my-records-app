import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import ProfileUpdate from "./ProfileUpdate";
import Identity from "./Identity";
import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";
import { Documents } from "./Documents";
import { ChangePassword } from "./ChangePassword";
import { NewRecord } from "./NewRecord";
import { RecordOverview } from "./RecordOverview";
import { EditRecord } from "./EditRecord";

function LoginApp() {
  // const { currentUser } = useAuth();

  return (
    <>
      <Router>
        <AuthProvider>
          {/* <PrivateRoute> */}
          <Navigation />
          {/* </PrivateRoute> */}
          {/* <Container className="d-flex align-items-center justify-content-center mt-10"> */}
          {/* <div className="w-100" style={{ maxWidth: "400px" }}> */}
          <div className="main-container align-items-center justify-content-center mt-10">
            <Outlet />
            <Routes>
              <Route path="/login" Component={Login}></Route>
              <Route path="/signup" Component={Signup}></Route>
              {/* <Route exact path="/home" Component={Dashboard}></Route> */}
              <Route
                path="/forgot-password"
                element={
                  <PrivateRoute>
                    <ForgotPassword />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/profile-update"
                element={
                  <PrivateRoute>
                    <ProfileUpdate />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/change-password"
                element={
                  <PrivateRoute>
                    <ChangePassword />
                  </PrivateRoute>
                }
              ></Route>

              <Route
                path="/new-record"
                element={
                  <PrivateRoute>
                    <NewRecord />
                  </PrivateRoute>
                }
              ></Route>

              <Route
                path="/edit-record/:key"
                element={
                  <PrivateRoute>
                    <EditRecord />
                  </PrivateRoute>
                }
              ></Route>

              <Route
                path="/record-details/:key"
                element={
                  <PrivateRoute>
                    <RecordOverview />
                  </PrivateRoute>
                }
              ></Route>

              <Route
                path="identity"
                element={
                  <PrivateRoute>
                    <Identity />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="my-docs"
                element={
                  <PrivateRoute>
                    <Documents />
                  </PrivateRoute>
                }
              ></Route>

              <Route
                exact
                path="/home"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                exact
                path="*"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              ></Route>
            </Routes>
            {/* </div> */}
          </div>
        </AuthProvider>
      </Router>
    </>
  );
}

export default LoginApp;
