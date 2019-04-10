import React from "react";
import { Link } from "react-router-dom";

const RightAlignedLink = ({ to, children }) => {
  return (
    <div className="RightAlignedLinkWrapper">
      <Link className="RightAlignedLinkLink" to={to}>
        {children}
      </Link>
    </div>
  );
};

export default RightAlignedLink;
