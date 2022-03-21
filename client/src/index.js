import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App";
import Jorney from "./screens/Jorney";
import AddNewJorney from "./screens/AddNewJorney";
import Menu from "./components/Menu/Menu";

ReactDOM.render(
  <BrowserRouter>
    <Menu />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path=":id/" element={<Jorney />} />
      <Route path="addnewjorney" element={<AddNewJorney />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
