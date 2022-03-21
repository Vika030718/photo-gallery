import React from "react";
import JorneyListItem from "../components/JorneyList/JorneyListItem";

export default function JorneyList({ jorney }) {
  return <JorneyListItem {...jorney} />;
}
