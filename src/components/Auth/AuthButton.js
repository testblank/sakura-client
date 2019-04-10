import React from "react";

const AuthButton = ({ onClick, children }) => {
  return (
    <div className="AuthButtonWrapper" onClick={onClick}>
      {children}
    </div>
  );
};

export default AuthButton;
