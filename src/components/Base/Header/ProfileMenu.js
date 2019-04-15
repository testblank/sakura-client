import React from "react";
import "./Header.scss";
import {Link} from 'react-router-dom';

const ProfileMenu = ({ handleLinkClick }) => {
  return (
    <div className="ProfileMenuWrapper">
      <div className="MenuContainer">
        <div className="MenuItem" onClick={handleLinkClick}>
          <Link to="/board">BOARD</Link>
          <Link to="/profile">PROFILE</Link>
          <Link to="/about">ABOUT</Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
