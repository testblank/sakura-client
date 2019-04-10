import React from "react";
// import { Link } from "react-router-dom";
import "./Header.scss";
import src from '../../../static/images/default_thumbnail.png';

const ProfileButton = ({ username, thumbnail, onClick}) => {
  return (
    <div className="ProfileButtonWrapper" onClick={onClick}>
      {/* <Link className="ProfileButtonLink" to=""> */}
        <img
          className="ProfileButtonThumbnail"
          src={src}
          alt={username}
        />
      {/* </Link> */}
    </div>
  );
};

export default ProfileButton;
