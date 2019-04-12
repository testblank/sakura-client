import React from "react";
import "./Home.scss";
import { DoubleBounce } from "better-react-spinkit";

const Pictures = ({ loading, url, id, tags }) => {
  if (loading) {
    return (
      <div className="PicturesLoading">
        <DoubleBounce color="#faa2c1" size={60} duration="3s"/>
      </div>
    )
  }
  return (
    <div className="PictureWrapper">
      <div className="PictureImgWrapper">
        <img className="PictureImg" src={url} id={id} alt={tags} />
      </div>
      <div className="PictureTags">{tags}</div>
    </div>
  );
};

export default Pictures;
