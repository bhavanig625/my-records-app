import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, database } from "./firebase";
import { ref, set, update, remove } from "firebase/database";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [data] = useState();
  const [userInformation, setUserInformation] = useState();
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [setUpdateStatus] = useState(false);

  async function SignUp(email, password, userDetails) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        UpdateUserProfile(userDetails);
        // updateProfile(auth.currentUser, { displayName: userDetails.fname });
        setUserInformation({
          displayame: user.displayName,
          email: user.email,
          uid: user.uid,
          accessToken: user.accessToken,
        });

        // console.log(user);

        // const userData = {
        //   ...userDetails,
        //   email: user.email,
        // };

        // const userRef = ref(database, "users/" + user.uid + "/details");
        // set(userRef, userData);

        navigate("/home");
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  }

  function UpdateUserProfile(userDetails) {
    updateProfile(auth.currentUser, { displayName: userDetails.fname });
  }

  const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    console.log("In google sign in");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  function SignIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function Logout() {
    return signOut(auth);
  }

  function PasswordReset(email) {
    return sendPasswordResetEmail(auth, email);
  }

  //Is throwing 400 bad request error
  function UpdatePassword(newPassword) {
    return updatePassword(currentUser, newPassword);
  }

  function handleLogOut() {
    setError("");
    try {
      Logout();
      navigate("/login");
    } catch (e) {
      console.log(e);
      setError("Failed to LogOut");
    }
  }

  function GetCurrentUser() {
    return currentUser.uid;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const dataRef = ref(database, "users/");

  function InsertData(inputData, dataref) {
    console.log("Inserting", inputData);
    set(dataref, inputData)
      .then(() => {
        setMessage("Data saved successfully.");
      })
      .catch(() => {
        setError("Data could not be saved." + error);
      });
  }

  function UpdateData(dataref, inputData) {
    return update(dataref, inputData)
      .then(() => {
        setUpdateStatus(true);
      })
      .catch((error) => {
        throw new Error("Data could not be updated. " + error.message);
      });
  }

  function DeleteData(dataref) {
    remove(dataref)
      .then(() => {
        setDeleteStatus(true);
      })
      .catch((error) => {
        throw new Error("Data could not be deleted. " + error.message);
      });
  }

  function GetMessage() {
    return message;
  }

  function GetData(dataref) {
    return dataref
      .once("value")
      .then((snapshot) => {
        const data = snapshot.val();
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        throw error; // Rethrow the error to be caught by the calling code
      });
  }

  // async function GetData(dataref) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const snapshot = await get(dataref);
  //       const data = snapshot.val();
  //       console.log(data);
  //       resolve(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       reject(error);
  //     }
  //   });
  // }

  const resetDeleteStatus = () => {
    setDeleteStatus(false);
  };

  const resetUpdateStatus = () => {
    setUpdateStatus(false);
  };
  const resetMessage = () => {
    setMessage(false);
  };

  const fetchData = async () => {
    const dataref = ref(database, "users/" + currentUser?.uid + "/records/");
    const snapshot = await dataref.on("value");
    const fetchedData = snapshot.val();
    console.log(fetchedData);
    // setData(fetchedData);
  };

  const value = {
    currentUser,
    SignUp,
    SignIn,
    Logout,
    PasswordReset,
    UpdatePassword,
    dataRef,
    handleLogOut,
    InsertData,
    GetCurrentUser,
    UpdateData,
    DeleteData,
    GetData,
    UpdateUserProfile,
    data,
    message,
    error,
    userInformation,
    fetchData,
    deleteStatus,
    GetMessage,
    resetMessage,
    resetDeleteStatus,
    resetUpdateStatus,
    signInWithGoogle,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
