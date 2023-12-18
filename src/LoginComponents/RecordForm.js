import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomField } from "./CustomField";
import {
  XCircle,
  ArrowLeftCircleFill,
  PlusCircleFill,
} from "react-bootstrap-icons";

export const RecordForm = (props) => {
  const { data } = props;
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState(false);
  const [showCustomFieldModal, setShowCustomFieldModal] = useState(false);
  const navigate = useNavigate();

  // const [setFile] = useState();
  // const [setFileLocation] = useState();

  const [customFieldsList, setCustomFieldsList] = useState([]);
  const [recordName, setRecordName] = useState("");
  const [recordValue, setRecordValue] = useState("");

  // if (data) {
  //   setRecordName(data?.recordName || "");
  //   setRecordValue(data?.recordValue || "");
  //   setCustomFieldsList(data?.customFields || "");
  // }

  useEffect(() => {
    if (data) {
      setRecordName(data.recordName || "");
      setRecordValue(data.recordValue || "");
      setCustomFieldsList(data.customFields || "");
    }
  }, [data]);

  const handleCustomFieldName = (fieldName) => {
    const newCustomField = {
      customFieldName: fieldName,
      customFieldValue: "",
      isError: "",
    };
    const newCustomFields = [...customFieldsList, newCustomField];
    setCustomFieldsList(newCustomFields);
  };

  const handleShowForm = (flag) => {
    setShowCustomFieldModal(flag);
  };

  // function handleFileUpload(e) {
  //   const selectedFile = e.target.files[0];
  //   setFile(selectedFile);
  //   const fileLoc = "images/" + currentUser.uid + "/" + data.record.recordName;
  //   setFileLocation(fileLoc);
  // }

  function handleCustomFieldValue(index, value) {
    const newFields = [...customFieldsList];
    newFields[index]["customFieldValue"] = value;
    setCustomFieldsList(newFields);

    // setFieldErrors((prevErrors) => {
    //   const newErrors = [...prevErrors];
    //   newErrors[index] = "";
    //   return newErrors;
    // });
    // console.log("handle", fieldErrors);
  }

  function handleDeleteCustomField(indexToDelete) {
    const updatedCustomFieldList = customFieldsList.filter(
      (_, index) => index !== indexToDelete
    );
    setCustomFieldsList(updatedCustomFieldList);
  }

  function handleAddNewField() {
    setShowCustomFieldModal(true);
  }

  const validateForm = () => {
    const validationErrors = {};
    if (!recordName.trim()) {
      validationErrors.recordName = "Please provide record title";
    }
    if (!recordValue.trim()) {
      validationErrors.recordValue = "Please provide record value";
    }

    if (customFieldsList.length > 0) {
      customFieldsList.forEach((field, index) => {
        if (!field.customFieldValue.trim()) {
          var fieldName = "customFieldValue" + index;
          validationErrors[fieldName] = "Please provide value";
        }
      });
    }

    // if (customFieldsList.length > 0) {
    //   customFieldsList?.map((field, index) => {
    //     if (!field.customFieldValue.trim()) {
    //       var fieldName = "customFieldValue" + index;
    //       validationErrors[fieldName] = "Please provide value";
    //     }
    //   });
    // }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) return true;
    else return false;
  };

  const handleGoBack = () => {
    navigate("/home");
  };

  async function handleDocumentSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const customFields = customFieldsList;
      const updatedTime = Date.now();
      const finalRecord = {
        recordName,
        recordValue,
        customFields,
        updatedTime,
      };
      if (validateForm()) props.onSubmit(finalRecord);

      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log("Error updating data", e);
    }
  }

  function renderFields() {
    return customFieldsList.map((field, index) => {
      return (
        <div className="row g-2 align-items-center" key={index}>
          <div className="col">
            <div className="form-floating">
              <input
                type="text"
                className={`form-control`}
                id={`custom-value-${index}`}
                value={field.customFieldValue}
                onChange={(e) => handleCustomFieldValue(index, e.target.value)}
                required
              />
              <label htmlFor={`custom-value-${index}`}>
                {field.customFieldName}
              </label>
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
          {errors?.["customFieldValue" + index] && !field.customFieldValue && (
            <div className="form-invalid-message">
              {errors["customFieldValue" + index]}
            </div>
          )}
        </div>
      );
    });
  }

  return (
    <>
      <div className="w-100 " style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div className="d-flex justify-content-between">
          <ArrowLeftCircleFill
            size={24}
            title="Back to home"
            onClick={() => handleGoBack()}
            style={{ cursor: "pointer" }}
          />
          <div className="text-center">
            <button
              className="btn btn-dark "
              disabled={loading}
              variant="primary"
              type="submit"
              onClick={handleDocumentSubmit}
            >
              Update
            </button>
          </div>
        </div>
        <h4>{props.formTitle}</h4>
        {/* {userMessage && <Alert variant="success">{userMessage}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>} */}
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
              value={recordName}
              onChange={(e) => setRecordName(e.target.value)}
              required
            />
            <label htmlFor="record-name">Title</label>
            {errors?.recordName && !recordName && (
              <div className="form-invalid-message">{errors.recordName}</div>
            )}
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="record-value"
              placeholder="Enter Value"
              value={recordValue}
              onChange={(e) => setRecordValue(e.target.value)}
              required
            />
            <label htmlFor="record-value">Value</label>
            {errors?.recordValue && !recordValue && (
              <div className="form-invalid-message">{errors.recordValue}</div>
            )}
          </div>
        </div>
        <div className="mb-1 mt-4">
          <h6>Custom fields</h6>
          {customFieldsList?.length > 0 && (
            <div
              className=" p-2 rounded mb-2 d-grid gap-2"
              style={{ backgroundColor: "#eeeeee" }}
            >
              {renderFields()}
            </div>
          )}

          <CustomField
            handleCustomFieldName={handleCustomFieldName}
            handleShowForm={handleShowForm}
            showCustomFieldModal={showCustomFieldModal}
            customFieldName={""}
          />
          <div>
            <PlusCircleFill
              title="Add new field"
              onClick={handleAddNewField}
              size={24}
              style={{ cursor: "pointer" }}
            />
          </div>
          {/* <button
            variant="primary"
            className="btn btn-primary "
            onClick={handleAddNewField}
          >
            Add Field
          </button> */}
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
        {/* <div className="mb-3 mt-3 text-center">
          <button
            className="btn btn-primary "
            disabled={loading}
            variant="primary"
            type="submit"
            onClick={handleDocumentSubmit}
          >
            Update
          </button>
        </div> */}
      </div>
    </>
  );
};
