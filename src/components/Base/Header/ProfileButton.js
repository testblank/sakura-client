import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const ProfileButton = ({ username, thumbnail, onClick}) => {
  return (
    <div className="ProfileButtonWrapper" onClick={onClick}>
      <Link className="ProfileButtonLink" to="">
        <img
          className="ProfileButtonThumbnail"
          src={thumbnail}
          alt={username}
        />
      </Link>
    </div>
  );
};

export default ProfileButton;
