import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Trash } from "react-bootstrap-icons";

const FileUpload = (props) => {
  const { handleFileUpload } = props;
  const maxSize = 1048576;
  const [selectedFiles, setSelectedFiles] = useState([]);
  //const maxSize = 10;

  //   const onDrop = useCallback((acceptedFiles) => {
  //     console.log(acceptedFiles);
  //     handleFileUpload(acceptedFiles);
  //   }, []);

  function handleFileDelete(fileToBeRemoved) {
    console.log("Remove file", fileToBeRemoved);
  }

  const onDrop = (acceptedFiles) => {
    const newFiles = [...selectedFiles, ...acceptedFiles];
    setSelectedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    console.log(newFiles);
    console.log(selectedFiles);
    handleFileUpload(newFiles);
  };

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
    acceptedFiles,
    rejectedFiles,
  } = useDropzone({
    onDrop,
    // accept: "image/png",
    // minSize: 0,
    // maxSize,
  });

  const isFileTooLarge =
    rejectedFiles?.length > 0 && rejectedFiles[0]?.size > maxSize;

  return (
    <>
      <div {...getRootProps()} className="file-upload-zone">
        {/* <label htmlFor="formFile" className="form-label">
          Upload File
        </label> */}
        <input {...getInputProps()} />
        {!isDragActive && "Click here or drop a file to upload!"}
        {isDragActive && !isDragReject && "Drop it like it's hot!"}
        {isDragReject && "File type not accepted, sorry!"}
        {isFileTooLarge && (
          <div className="text-danger mt-2">File is too large.</div>
        )}
      </div>
      <ul className="list-group mt-2">
        {acceptedFiles?.length > 0 &&
          acceptedFiles?.map((acceptedFile) => (
            <>
              <li
                className="list-group-item list-group-item-success"
                key={acceptedFile.name}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>{acceptedFile.name}</span>
                <span>
                  <Trash
                    size={24}
                    color="red"
                    style={{ cursor: "pointer" }}
                    onClick={handleFileDelete(acceptedFile)}
                  />
                </span>
              </li>
            </>
          ))}
      </ul>
    </>
  );
};

export default FileUpload;
