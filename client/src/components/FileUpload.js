import React, { Fragment, useState } from "react";
import axios from "axios";

const FileUpload = ({ jorney_id, isBanner, onUpload = (f) => f }) => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [isUploaded, setisUploaded] = useState(false);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("jorney_id", jorney_id);
    formData.append("isBanner", isBanner);

    try {
      await axios
        .post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const { fileName, filePath } = response.data;
          setUploadedFile({ fileName, filePath });
          setisUploaded(true);
        });
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
      <form onSubmit={onSubmit} name="uploadForm" id="uploadForm">
        <div className="d-flex justify-content-between align-items-center">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
            name="customFile"
          />
          {/* <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label> */}
          <input
            type="submit"
            value="Upload"
            className="btn btn-primary btn-block"
            name="uploadBtn"
            onClick={() => (uploadedFile ? onUpload(uploadedFile) : false)}
          />
        </div>
      </form>
      {/* {uploadedFile
        ? console.log(`----------${uploadedFile.fileName}`)
        : console.log("false")} */}
      {/* {uploadedFile ? (
        <div className="row">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img style={{ width: "100%" }} src={uploadedFile.filePath} alt="" />
          </div>
        </div>
      ) : null} */}
    </Fragment>
  );
};

export default FileUpload;
