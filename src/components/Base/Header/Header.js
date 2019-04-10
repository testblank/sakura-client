import React from "react";
import "./Header.scss";

const Header = ({ children }) => {
  return (
    <div className="HeaderPosition">
      <div className="HeaderBackground">
        <div className="HeaderContents">
          <div className="HeaderLogo">#SAKURA_POST</div>
          <div className="HeaderSpacer" />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Header;
