import React from "react";
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function JorneyPhoto({ id, image, onRemove = (f) => f }) {
  return (
    <Col md="4" lg="3">
      <div className="jorney-photo">
        <button
          className="jorney-delete"
          onClick={() => {
            onRemove(image);
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <img
          alt="photo_"
          src={`http://localhost:5000/uploads/${id}/photos/${image}`}
        />
      </div>
    </Col>
  );
}
