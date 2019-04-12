import React from "react";
import "./Home.scss";

const Pictures = ({ url, id, tags, onClick }) => {
  return (
    <div className="PictureWrapper">
      <div className="PictureImgWrapper">
        <div className="PictureImgModal" onClick={onClick}>
        <img className="PictureImg" src={url} id={id} alt={tags} />
        </div>
      </div>
      <div className="PictureTags">{tags}</div>
    </div>
  );
};

export default Pictures;
