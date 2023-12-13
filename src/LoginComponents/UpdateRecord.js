import React, { useState } from "react";
import { json } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { database } from "./firebase";
import { ref, onValue } from "firebase/database";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { Button, Alert } from "react-bootstrap";
import { CustomField } from "./CustomField";
import { XCircle, PlusCircle } from "react-bootstrap-icons";

export const UpdateRecord = () => {
  const { currentUser, UpdateData } = useAuth();
  const { key } = useParams();
  const [imageUrl, setImageUrl] = useState();
  const [data, setData] = useState();
  const dataref = ref(
    database,
    "users/" + currentUser?.uid + "/records/" + key
  );
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [userMessage, setUserMessage] = useState();
  const [showNewField, setShowNewField] = useState(false);
  const [showCustomFieldModal, setShowCustomFieldModal] = useState(false);

  const [fields, setFields] = useState([]);
  const [file, setFile] = useState();
  const [fileLocation, setFileLocation] = useState();
  const [record, setRecord] = useState({ recordName: "", recordValue: "" });
  const [finalCustomFields, setFinalCustomFields] = useState([]);

  const [customFieldsList, setCustomFieldsList] = useState([]);
  const [isValid, setIsValid] = useState("");

  useEffect(() => {
    const unsubscribe = onValue(
      dataref,
      (snapshot) => {
        if (snapshot.exists()) {
          const retrievedData = snapshot.val();
          setData(retrievedData);
          if (retrievedData.record != null) {
            setRecord(retrievedData.record);
          }
          if (retrievedData?.customFields?.length > 0) {
            setCustomFieldsList(retrievedData.customFields);
          }
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
  }, []);

  const handleCustomFieldName = (fieldName) => {
    const newCustomField = {
      customFieldName: fieldName,
      customFieldValue: "",
    };
    const newCustomFields = [...customFieldsList, newCustomField];
    setCustomFieldsList(newCustomFields);
  };

  const handleShowForm = (flag) => {
    setShowCustomFieldModal(flag);
  };

  function handleFileUpload(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const fileLoc = "images/" + currentUser.uid + "/" + data.record.recordName;
    setFileLocation(fileLoc);
  }

  function handleCustomFieldValue(index, value) {
    const newFields = [...customFieldsList];
    newFields[index]["customFieldValue"] = value;
    setCustomFieldsList(newFields);
  }

  function handleDeleteCustomField(indexToDelete) {
    const updatedCustomFieldList = customFieldsList.filter(
      (item, index) => index !== indexToDelete
    );
    setCustomFieldsList(updatedCustomFieldList);
  }

  function handleFieldChange(index, key, value) {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
    //setFinalCustomFields(newFields);
    console.log(finalCustomFields);
  }

  function setFinalFields() {
    const filteredData = fields.filter(
      (item) => item.customValue.trim() !== "" || item.customField.trim() !== ""
    );
    // setFinalCustomFields((prevData) => [...prevData, ...filteredData]);
    return filteredData;
  }

  function handleRecordFieldChange(key, value) {
    const newRecord = { ...record };
    newRecord[key] = value;
    setRecord(newRecord);
  }

  function addFields(e) {
    e.preventDefault();
    setShowCustomFieldModal(true);
    setShowNewField(true);
    const newField = { customField: "", customValue: "" };
    setFields([...fields, newField]);
  }

  async function handleDocumentSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (record?.recordName == null || record?.recordName.trim() === "") {
      setLoading(false);
      return setError("Please enter Recod Title");
    }

    try {
      setError("");
      //   const imgURL = file != null ? await uploadImage(fileLocation) : "";
      //   console.log(imgURL);

      //const customFields = setFinalFields();
      const customFields = customFieldsList;
      console.log(customFields);
      const updatedTime = Date.now();
      const finalRecord = { record, customFields, updatedTime };
      // console.log(finalRecord);

      UpdateData(dataref, finalRecord)
        .then((successMessage) => {
          setUserMessage(successMessage);
          navigate("/record-details/" + key);
        })
        .catch((error) => {
          setError("Data could not be updated. ");
        });

      setLoading(false);
    } catch (e) {
      console.log("Error updating data", e);
    }
  }

  function renderFields() {
    return customFieldsList.map((field, index) => (
      <div className="row g-2 align-items-center" key={index}>
        <div className="col">
          <div className="form-floating">
            <input
              type="text"
              className={`form-control ${isValid}`}
              id={`custom-value-${index}`}
              placeholder="Custom Value"
              value={field.customFieldValue}
              onChange={(e) => handleCustomFieldValue(index, e.target.value)}
              required
            />
            <label htmlFor={`custom-value-${index}`}>
              {field.customFieldName}
            </label>
            <div className="invalid-feedback">Please provide value.</div>
          </div>
        </div>
        <div className="col-auto">
          <XCircle
            size={20}
            color="grey"
            style={{ cursor: "pointer" }}
            onClick={() => handleDeleteCustomField(index)}
            title="Remove Field"
          />
        </div>
      </div>
    ));
  }

  return (
    <>
      <div className="w-100 " style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h4>Edit Record</h4>
        {userMessage && <Alert variant="success">{userMessage}</Alert>}
        {/* {error && <Alert variant="danger">{error}</Alert>} */}
        <div
          className=" p-2 rounded mb-2 d-grid gap-2"
          style={{ backgroundColor: "#eeeeee" }}
        >
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="record-name"
              placeholder="Enter Title"
              value={record?.recordName}
              onChange={(e) =>
                handleRecordFieldChange("recordName", e.target.value)
              }
              required
            />
            <label htmlFor="record-name">Title</label>
            <div className="invalid-feedback">Please provide record title.</div>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="record-number"
              placeholder="Enter Value"
              value={record?.recordValue}
              onChange={(e) =>
                handleRecordFieldChange("recordValue", e.target.value)
              }
              required
            />
            <label htmlFor="record-number">Value</label>
            <div className="invalid-feedback">Please provide record value.</div>
          </div>
        </div>
        <div className="mb-1 mt-2">
          <h6>Custom fields</h6>
          <div
            className=" p-2 rounded mb-2 d-grid gap-2"
            style={{ backgroundColor: "#eeeeee" }}
          >
            {renderFields()}
            {showCustomFieldModal && (
              <CustomField
                handleCustomFieldName={handleCustomFieldName}
                handleShowForm={handleShowForm}
                showCustomFieldModal={showCustomFieldModal}
                customFieldName={""}
              />
            )}
          </div>
          <button
            variant="primary"
            className="btn btn-primary "
            onClick={addFields}
          >
            {/* <PlusCircle className="" /> */}
            Add Field
          </button>
        </div>
        {/* <div className="mb-2 mt-2">
          <label htmlFor="formFile" className="form-label">
            <h6>Upload File</h6>
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={handleFileUpload}
            accept="image/png, image/jpeg"
          />
        </div> */}
        <div className="mb-3 mt-3 text-center">
          <button
            className="btn btn-primary "
            disabled={loading}
            variant="primary"
            type="submit"
            onClick={handleDocumentSubmit}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};
