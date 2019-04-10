import React from "react";
import './Auth.scss';

const AuthContent = ({ title, children }) => {
  return (
    <div>
      <div className="AuthContentTitle">{title}</div>
      {children}
    </div>
  );
};

export default AuthContent;
