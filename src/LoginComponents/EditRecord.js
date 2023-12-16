import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { database } from "./firebase";
import { ref, onValue } from "firebase/database";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { RecordForm } from "./RecordForm";

export const EditRecord = () => {
  const navigate = useNavigate();
  const { currentUser, UpdateData } = useAuth();
  const { key } = useParams();
  const [data, setData] = useState({});
  const [setError] = useState("");
  const dataref = ref(
    database,
    "users/" + currentUser?.uid + "/records/" + key
  );
  const formTitle = "Edit Record";

  useEffect(() => {
    const fetchData = async () => {
      const unsubscribe = onValue(
        dataref,
        (snapshot) => {
          if (snapshot.exists()) {
            const retrievedData = snapshot.val();
            setData(retrievedData);
          }
        },
        (error) => {
          console.log(error.message);
        }
      );
      return () => unsubscribe();
    };
    fetchData();
  }, [dataref]);

  const handleRecordUpdate = (finalRecord) => {
    UpdateData(dataref, finalRecord)
      .then(() => {
        navigate("/record-details/" + key);
      })
      .catch((error) => {
        setError("Data could not be updated. ");
      });
  };

  return (
    <div>
      <RecordForm
        formTitle={formTitle}
        data={data}
        onSubmit={handleRecordUpdate}
        recordKey={key}
      />
    </div>
  );
};
