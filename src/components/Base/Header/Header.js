import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

const Header = ({ children, handleLinkClick }) => {
  return (
    <div className="HeaderPosition">
      <div className="HeaderBackground">
        <div className="HeaderContents">
          <Link to="/" className="HeaderLogo">
            <div onClick={handleLinkClick}>#SAKURA_POST</div>
          </Link>
          <div className="HeaderSpacer" />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Header;
