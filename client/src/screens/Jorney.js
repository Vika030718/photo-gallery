import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import FileUpload from "../components/FileUpload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Jorney() {
  let { id } = useParams();
  const [jorney, setJorney] = useState(false);
  const [banner_src, setBannerSrc] = useState("../../../images/__blank.jpg");

  useEffect(() => {
    getJorney();
  }, []);

  function getJorney() {
    console.log("Start getting jorney");
    fetch(`http://localhost:5000/getjorney/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let photos = data[0].images.photos_names.reverse();
        data[0].images.photos_names = photos;
        setJorney(data[0]);
        if (data[0].images.banner_name)
          setBannerSrc(
            `http://localhost:5000/uploads/${data[0].creation_date}/banner/${data[0].images.banner_name}`
          );
      });
  }

  return (
    <Container fluid className="wrapper">
      {jorney ? (
        <div className="mt-4">
          <div
            className="jorney-banner"
            style={{ backgroundImage: `url(${banner_src})` }}
          >
            <div className="jorney-info">
              <h1 className="mt-0">{jorney.title}</h1>
              <p>{jorney.description}</p>
              <p className="mb-0">From: {jorney.start_date}</p>
              <p className="mb-0">Till: {jorney.end_date}</p>
            </div>

            <div className="jorney-info mt-3">
              <FileUpload
                isBanner={true}
                jorney_id={jorney.creation_date}
                onUpload={(uploadedFile) => {
                  console.log(uploadedFile);
                  if (uploadedFile) {
                    console.log(banner_src);
                  }
                }}
              />
            </div>
          </div>
          <Row className="mb-3">
            <FileUpload isBanner={false} jorney_id={jorney.creation_date} />
          </Row>
          <Row>
            {jorney.images
              ? jorney.images.photos_names.map((image, i) => (
                  <Col md="4" lg="3" key={i}>
                    <div className="jorney-photo">
                      {/* <div className="jorney-delete">
                        <FontAwesomeIcon icon={faXmark} />
                      </div> */}
                      <img
                        alt="photo_"
                        src={`http://localhost:5000/uploads/${jorney.creation_date}/photos/${image}`}
                      />
                    </div>
                  </Col>
                ))
              : "There are no photos available"}
          </Row>
        </div>
      ) : (
        "There is no jorneys data available"
      )}
    </Container>
  );
}
