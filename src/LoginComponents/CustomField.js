import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const CustomField = (props) => {
  const [customFieldName, setCustomFieldName] = useState("");

  function handleHide() {
    props.handleShowForm(false);
  }

  function handleFieldSubmit() {
    props.handleCustomFieldName(customFieldName);
    props.handleShowForm(false);
    setCustomFieldName("");
  }

  return (
    <div>
      <Modal show={props.showCustomFieldModal} onHide={handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>Custom Field</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Please enter custom field name</p>
          <div className="col-md">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id={`custom-field`}
                placeholder="Custom Field"
                value={customFieldName}
                onChange={(e) => setCustomFieldName(e.target.value)}
              />
              <label htmlFor={`custom-field`}>Custom Field</label>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleHide}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleFieldSubmit}
            disabled={!customFieldName}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
