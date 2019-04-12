import React from "react";
import "./Home.scss";

const HomeWrapper = ({ picture, more }) => {
  return (
    <div className="HomeWrapper">
      <div className="HomeWrapperPictures">{picture}</div>
      <div>{more}</div>
    </div>
  );
};

export default HomeWrapper;
