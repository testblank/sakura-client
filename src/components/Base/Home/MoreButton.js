import React from "react";
import { FadingCircle } from "better-react-spinkit";

const MoreButton = ({ loading, onClick }) => {
  if (loading) {
    return (
      <FadingCircle
        className="PicturesLoading"
        color="#faa2c1"
        size={60}
      />
    );
  }
  return (
    <div className="MoreButton" onClick={onClick}>
      more sakura, be more chill..!
    </div>
  );
};

export default MoreButton;
