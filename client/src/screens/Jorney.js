import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export default function Jorney() {
  let { id } = useParams();
  const [jorney, setJorney] = useState(false);

  useEffect(() => {
    getJorney();
  }, []);
  console.log(jorney);

  function getJorney() {
    fetch(`http://localhost:5000/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setJorney(data);
      });
  }
  return (
    <Container fluid>
      {jorney ? (
        <div>
          <div
            className="jorney-banner"
            style={{
              backgroundImage: `url(
                "../../../uploads/${jorney[0].creation_date}/banner/${jorney[0].images[0]}"
              )`,
            }}
          >
            <h1 className="mt-3">{jorney[0].title}</h1>
          </div>
          <Row>
            {jorney[0].images.map((image, i) => (
              <Col md="4" lg="3">
                <div className="jorney-photo">
                  <img
                    alt="photo_"
                    src={`../../../uploads/${jorney[0].creation_date}/photos/${image}`}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        "There is no jorneys data available"
      )}
    </Container>
  );
}
