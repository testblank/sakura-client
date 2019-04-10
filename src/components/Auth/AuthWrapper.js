import React from "react";
import { Link } from "react-router-dom";
import "./Auth.scss";

const AuthWrapper = ({ children }) => {
  return (
    <div className="AuthWrapperPosition">
      <div className="AuthWrapperBox">
        <div className="AuthWrapperLogo">
          <Link className="AuthWrapperLink" to="/">
            #SAKURA_POST
          </Link>
        </div>
        <div className="AuthWrapperContents">{children}</div>
      </div>
    </div>
  );
};

export default AuthWrapper;
