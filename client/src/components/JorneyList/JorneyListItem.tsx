import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./JorneyListItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function JorneyListItem({
  title,
  start_date,
  creation_date,
  images,
  onRemove = (f: any) => f,
}: {
  title: string;
  start_date: string;
  creation_date: string;
  images?: { banner_name?: string; photos_names?: [] };
  onRemove: any;
}) {
  let banner_src =
    typeof images === "object" && images.banner_name
      ? `http://localhost:5000/uploads/${creation_date}/banner/${images.banner_name}`
      : `../../../images/__blank.jpg`;

  return (
    <Col md="4" lg="3" className="mb-3">
      <div className="position-relative">
        <div className="jorney-delete">
          <button
            onClick={() => {
              onRemove(creation_date);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <Link to={`/${creation_date}`} className="jorney-card ">
          <Card>
            <div className="image-wrapper">
              <Card.Img variant="top" src={banner_src} />
            </div>

            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>{start_date}</Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </div>
    </Col>
  );
}
