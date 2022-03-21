import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./JorneyListItem.scss";

export default function JorneyListItem({
  title,
  start_date,
  creation_date,
  images,
}) {
  return (
    <Col md="4" lg="3" className="mb-3">
      <Link to={`/${creation_date}`} className="jorney-card ">
        <Card>
          <div className="image-wrapper">
            <Card.Img
              variant="top"
              src={`../../../uploads/${creation_date}/banner/${images.image_0}`}
            />
          </div>

          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{start_date}</Card.Text>
            {/* <Button variant="primary">{creation_date}</Button> */}
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}
