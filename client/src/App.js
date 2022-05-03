import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import "./App.scss";
import JorneyList from "./screens/JorneyList";

function App() {
  const [jorneys, setJorneys] = useState(false);
  useEffect(() => {
    getJorneys();
  }, []);
  function getJorneys() {
    fetch("http://localhost:5000/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let sorted_data = data.reverse();
        setJorneys(sorted_data);
      });
  }

  function deleteJorney(id) {
    fetch(`http://localhost:5000/jorney/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        getJorneys();
      });
  }

  return (
    <>
      <Container fluid className="wrapper">
        <Row className="mt-3">
          {jorneys
            ? jorneys.map((jorney, i) => {
                return (
                  <JorneyList
                    jorney={jorney}
                    key={i}
                    onRemoveJorney={(id) => {
                      deleteJorney(id);
                      getJorneys();
                    }}
                  />
                );
              })
            : "There is no jorneys data available"}
          <br />
        </Row>
      </Container>
    </>
  );
}

export default App;
