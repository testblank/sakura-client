import React from "react";

const MoreButton = ({ onClick }) => {
  return (
    <div className="MoreButton" onClick={onClick}>
      want some more?
    </div>
  );
};

export default MoreButton;
