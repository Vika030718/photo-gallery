import React from "react";
import JorneyPhoto from "./JorneyPhoto";

export default function JorneyPhotosList({ jorney, id, onRemove = (f) => f }) {
  return (
    <>
      {jorney.images
        ? jorney.images.photos_names.map((image, i) => (
            <JorneyPhoto id={id} image={image} key={i} onRemove={onRemove} />
          ))
        : "There are no photos available"}
    </>
  );
}
