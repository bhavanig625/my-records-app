import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { database } from "./firebase";
import { ref, onValue } from "firebase/database";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  PencilSquare,
  ArrowLeftCircleFill,
  Trash3Fill,
  Clipboard,
  Clipboard2CheckFill,
} from "react-bootstrap-icons";
import { Alert } from "react-bootstrap";
import { ConfirmationAlert } from "./ConfirmationAlert";
import copy from "clipboard-copy";

export const RecordOverview = () => {
  const { currentUser, DeleteData } = useAuth();
  const { key } = useParams();
  const [imageUrl, setImageUrl] = useState();
  const [message] = useState(null);
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);
  const [mouseOvers, setMouseOvers] = useState({});
  const [copies, setCopies] = useState({});

  const dataref = ref(
    database,
    "users/" + currentUser?.uid + "/records/" + key
  );

  const [data, setData] = useState();
  const navigate = useNavigate();

  function handleRecordEdit() {
    navigate("/edit-record/" + key);
  }

  const handleGoBack = () => {
    navigate("/home");
  };

  const handleDeleteRecord = () => {
    setShowConfirmationAlert(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmationAlert(false);
    await DeleteData(dataref);

    setTimeout(() => {
      navigate("/home");
    }, 500);
  };

  const handleCancelDelete = () => {
    setShowConfirmationAlert(false);
  };

  const handleMouseOver = (field) => {
    setMouseOvers({ ...mouseOvers, [field]: true });
  };

  const handleMouseOut = (field) => {
    setMouseOvers({ ...mouseOvers, [field]: false });
  };

  const copyToClipboard = async (field, textToCopy) => {
    await copy(textToCopy);
    const updatedData = Object.fromEntries(
      Object.keys(copies).map((key) => [key, false])
    );
    setCopies({ ...updatedData, [field]: true });

    setTimeout(() => {
      setCopies({ ...copies, [field]: false });
    }, 5000);
  };

  useEffect(() => {
    const unsubscribe = onValue(
      dataref,
      (snapshot) => {
        if (snapshot.exists()) {
          const retrievedData = snapshot.val();
          setData(retrievedData);
          if (
            retrievedData?.imgURL != null ||
            retrievedData?.imgURL?.Trim() !== ""
          ) {
            setImageUrl(retrievedData?.imgURL);
          }
        }
      },
      (error) => {
        console.log(error.message);
      }
    );
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-100" style={{ maxWidth: "400px", margin: "0 auto" }}>
        <ConfirmationAlert
          show={showConfirmationAlert}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
        {message && <Alert variant="success">{message}</Alert>}
        <div className="d-flex justify-content-between">
          <ArrowLeftCircleFill
            size={24}
            title="Back to home"
            onClick={() => handleGoBack()}
            style={{ cursor: "pointer" }}
          />
          <div>
            <PencilSquare
              size={24}
              title="Edit"
              onClick={() => handleRecordEdit()}
              style={{ cursor: "pointer", margin: "10px" }}
            />
            <Trash3Fill
              size={24}
              title="Delete"
              onClick={handleDeleteRecord}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="d-flex flex-column mt-3">
          <div className="mb-3">
            <h1 style={{ textAlign: "center" }}>{data?.recordName}</h1>
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-center flex-grow-1">
                <h5
                  onMouseOver={() => handleMouseOver("recordValue")}
                  onMouseOut={() => handleMouseOut("recordValue")}
                  onClick={() =>
                    copyToClipboard("recordValue", data?.recordValue)
                  }
                  style={{ textAlign: "center" }}
                >
                  {data?.recordValue}
                </h5>
              </div>
              <div className={`text-end `}>
                {/* <Clipboard /> */}
                {mouseOvers?.recordValue && !copies?.recordValue && (
                  <Clipboard />
                )}
                {mouseOvers?.recordValue && copies?.recordValue && (
                  <Clipboard2CheckFill />
                )}
              </div>
            </div>
          </div>
          {data?.customFields?.length > 0 && (
            <div className="d-grid rounded border mt-2">
              {data?.customFields?.map((item, index) => (
                <div key={index} className="p-2 bg-light border-bottom">
                  <div style={{ color: "grey" }}>{item.customFieldName}</div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                    onMouseOver={() => handleMouseOver("customField" + index)}
                    onMouseOut={() => handleMouseOut("customField" + index)}
                    onClick={() =>
                      copyToClipboard(
                        "customField" + index,
                        item.customFieldValue
                      )
                    }
                  >
                    {item.customFieldValue}
                    <span>
                      {mouseOvers?.["customField" + index] &&
                        !copies?.["customField" + index] && (
                          <Clipboard
                            onClick={() =>
                              copyToClipboard(
                                "customField" + index,
                                item.customFieldValue
                              )
                            }
                          />
                        )}
                      {mouseOvers?.["customField" + index] &&
                        copies?.["customField" + index] && (
                          <Clipboard2CheckFill />
                        )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {imageUrl && (
            <div>
              <img
                className="record-img"
                src={data?.imgURL}
                alt="Document"
              ></img>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
