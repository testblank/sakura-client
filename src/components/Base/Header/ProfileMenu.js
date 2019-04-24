import React from "react";
import "./Header.scss";
import {Link} from 'react-router-dom';

const ProfileMenu = ({ handleLinkClick, handleLogout, username }) => {
  return (
    <div className="ProfileMenuWrapper">
      <div className="MenuContainer">
        <div className="MenuItem" onClick={handleLinkClick}>
          <div>Hello! <span>{username}</span></div>
          <Link to="/posts">POSTS</Link>
          <Link to="/profile">PROFILE</Link>
          <div onClick={handleLogout}>LOGOUT</div>
          <Link to="/about">ABOUT</Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
