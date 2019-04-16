import React from "react";
import "./Header.scss";
import {Link} from 'react-router-dom';

const ProfileMenu = ({ handleLinkClick, handleLogout }) => {
  return (
    <div className="ProfileMenuWrapper">
      <div className="MenuContainer">
        <div className="MenuItem" onClick={handleLinkClick}>
          <Link to="/posts">POSTS</Link>
          <Link to="/profile">PROFILE</Link>
          <Link to="/about">ABOUT</Link>
          <div onClick={handleLogout}>LOGOUT</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
