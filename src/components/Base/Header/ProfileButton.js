import React from "react";
import "./Header.scss";

const ProfileButton = ({
  username,
  thumbnail,
  logout,
  menuToggle,
  isOpened,
  menu
}) => {
  return (
    <div className="ProfileButtonWrapper">
      <div className="ProfileButtonLink" onClick={menuToggle}>
        <img
          className="ProfileButtonThumbnail"
          src={thumbnail}
          alt={username}
        />
      </div>
      {isOpened ? menu : null}
    </div>
  );
};

export default ProfileButton;
