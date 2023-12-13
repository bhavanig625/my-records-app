import React from "react";
import { useNavigate } from "react-router-dom";
import { SearchRecord } from "./SearchRecord";

export const RecordList = (props) => {
  const { recordsList } = props;
  const navigate = useNavigate();

  function handleRecordDetails(key) {
    navigate("/record-details/" + key);
  }

  function capitalizeFirstLetter(name) {
    return name?.charAt(0).toUpperCase() + name?.slice(1);
  }

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <h4>Your Records</h4>
        </div>
        <SearchRecord
          records={props.records}
          getFilteredData={props.getFilteredData}
        />
      </div>
      <div className="d-flex flex-column alter-color border">
        {recordsList &&
          Object.keys(recordsList).map((key, index) => (
            <div
              className="p-2"
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleRecordDetails(
                  recordsList[Object.keys(recordsList)[index]].key
                )
              }
            >
              {capitalizeFirstLetter(
                recordsList[Object.keys(recordsList)[index]].recordName
              )}
            </div>
          ))}
      </div>
    </>
  );
};
