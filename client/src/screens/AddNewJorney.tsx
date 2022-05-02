import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AddNewJorney() {
  const [new_jorney, setNewJorney] = useState({
    title: "",
    start_date: "",
    end_date: "",
    description: "",
    creation_date: Date.now(),
    images: { banner_name: "", photos_names: [] },
  });

  let navigate = useNavigate();

  function addNewJorney(e: any) {
    e.preventDefault();
    new_jorney.creation_date = Date.now();
    fetch("http://localhost:5000/addnewjorney", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(new_jorney),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        console.log(data);
        navigate(`/${new_jorney.creation_date}`);
      });
  }

  return (
    <Container fluid className="wrapper pt-3">
      <Form>
        <Form.Label>Jorney title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter a title"
          name="title"
          value={new_jorney.title}
          onChange={(e) =>
            setNewJorney({ ...new_jorney, title: e.target.value })
          }
        />
        <Form.Label>Jorney Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter a description"
          name="description"
          onChange={(e) =>
            setNewJorney({
              ...new_jorney,
              description: e.target.value,
            })
          }
        />
        <Form.Label>Jorney Start Date</Form.Label>
        <Form.Control
          type="date"
          placeholder="Enter Start Date"
          name="start_date"
          onChange={(e) =>
            setNewJorney({
              ...new_jorney,
              start_date: e.target.value,
            })
          }
        />
        <Form.Label>Jorney End Date</Form.Label>
        <Form.Control
          type="date"
          placeholder="Enter End Date"
          name="end_date"
          onChange={(e) =>
            setNewJorney({
              ...new_jorney,
              end_date: e.target.value,
            })
          }
        />

        <button className="mt-3" onClick={addNewJorney}>
          Save changes
        </button>
      </Form>
    </Container>
  );
}
