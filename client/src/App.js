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
    fetch("http://localhost:5000/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setJorneys(data);
      });
  }
  // function createMerchant() {
  //   let name = prompt("Enter merchant name");
  //   let email = prompt("Enter merchant email");
  //   fetch("http://localhost:3001/merchants", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ name, email }),
  //   })
  //     .then((response) => {
  //       return response.text();
  //     })
  //     .then((data) => {
  //       alert(data);
  //       getMerchant();
  //     });
  // }

  // function deleteMerchant() {
  //   let id = prompt("Enter merchant id");
  //   fetch(`http://localhost:3001/merchants/${id}`, {
  //     method: "DELETE",
  //   })
  //     .then((response) => {
  //       return response.text();
  //     })
  //     .then((data) => {
  //       alert(data);
  //       getMerchant();
  //     });
  // }
  return (
    <>
      <Container fluid>
        <Row className="mt-3">
          {jorneys
            ? jorneys.map((jorney, i) => {
                console.log(jorney);
                return <JorneyList jorney={jorney} key={i} />;
              })
            : "There is no jorneys data available"}
          <br />
          {/* <button onClick={createMerchant}>Add merchant</button>
              <br />
              <button onClick={deleteMerchant}>Delete merchant</button> */}
        </Row>
      </Container>
    </>
  );
}

export default App;
