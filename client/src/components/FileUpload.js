import React, { Fragment, useState } from "react";
import axios from "axios";

const FileUpload = ({ jorney_id, setIsUploaded, fileType }) => {
  const [file, setFile] = useState("");
  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jorney_id", jorney_id);
    formData.append("fileType", fileType);

    try {
      await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsUploaded(true);
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit} name="uploadForm">
        <div className="d-flex justify-content-between align-items-center">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
            name="customFile"
          />
          <input
            type="submit"
            value="Upload"
            className="btn btn-primary btn-block"
            name="uploadBtn"
          />
        </div>
      </form>
    </Fragment>
  );
};

export default FileUpload;
