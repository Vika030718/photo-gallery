import React from "react";
import JorneyListItem from "../components/JorneyList/JorneyListItem";

export default function JorneyList({ jorney, onRemoveJorney = (f) => f }) {
  return <JorneyListItem {...jorney} onRemove={onRemoveJorney} />;
}
