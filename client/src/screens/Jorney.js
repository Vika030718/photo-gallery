import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import JorneyPhotosList from "../components/Jorney/JorneyPhotosList";
import JorneyHead from "../components/Jorney/JorneyHead";
import FileUpload from "../components/FileUpload";
import * as constants from "../constants";

export default function Jorney() {
  let { id } = useParams();
  const [jorney, setJorney] = useState(false);
  const [banner_name, setBanner] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() => {
    getJorney();
    setIsUploaded(false);
  }, [isUploaded]);

  function getJorney() {
    fetch(`http://localhost:5000/getjorney/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let photos = data[0].images.photos_names.reverse();
        data[0].images.photos_names = photos;
        setJorney(data[0]);
        if (data[0].images.banner_name) {
          setBanner(data[0].images.banner_name);
        }
      });
  }

  function deleteJorney(photoId) {
    fetch(`http://localhost:5000/jorney/deletephoto/${id}/${photoId}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then(() => {
        getJorney();
      });
  }

  return (
    <Container fluid className="wrapper">
      {jorney ? (
        <div className="mt-4">
          <JorneyHead
            id={id}
            jorney={jorney}
            banner_name={banner_name}
            setIsUploaded={setIsUploaded}
          />
          <Row className="mb-3">
            <FileUpload
              setIsUploaded={setIsUploaded}
              fileType={constants.PHOTO}
              jorney_id={jorney.creation_date}
            />
          </Row>
          <Row className="mb-3">
            <JorneyPhotosList
              id={id}
              jorney={jorney}
              onRemove={(photoId) => {
                console.log("Inside list");
                deleteJorney(photoId);
                getJorney();
              }}
            />
          </Row>
        </div>
      ) : (
        <Row className="mb-3">
          <p className="text-center">"There is no jorneys data available"</p>
        </Row>
      )}
    </Container>
  );
}
