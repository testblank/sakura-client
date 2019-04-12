import React from "react";
import "./Home.scss";

const HomeWrapper = ({ picture, more, modal }) => {
  return (
    <div className="HomeWrapper">
      <div className="HomeWrapperPictures">{picture}</div>
      {modal}
      <div>{more}</div>
    </div>
  );
};

export default HomeWrapper;
