import React from "react";
import FileUpload from "../FileUpload";
import * as constants from "../../constants";

export default function JorneyHead({ banner_name, id, jorney, setIsUploaded }) {
  let banner_dir = banner_name
    ? `http://localhost:5000/uploads/${id}/banner/${banner_name}`
    : "../../../images/__blank.jpg";
  return (
    <div
      className="jorney-banner"
      style={{
        backgroundImage: `url(${banner_dir})`,
      }}
    >
      <div className="jorney-info">
        <h1 className="mt-0">{jorney.title}</h1>
        <p>{jorney.description}</p>
        <p className="mb-0">From: {jorney.start_date}</p>
        <p className="mb-0">Till: {jorney.end_date}</p>
      </div>

      <div className="jorney-info mt-3">
        <FileUpload
          setIsUploaded={setIsUploaded}
          fileType={constants.BANNER}
          jorney_id={jorney.creation_date}
        />
      </div>
    </div>
  );
}
