import React from "react";
import "./Profile.scss";

const ProfileHeader = ({ thumbnail, username, postsCnt }) => {
  return (
    <div className="ProfileHeader body">
      <div className="ProfileHeaderContent">
        <div className="PofileHeaderImgWrapper">
          <img className="ProfileHeaderImg" src={thumbnail} alt={username} />
        </div>
        <div className="ProfileHeaderText">
          <div className="ProfileHeaderName">@{username}</div>
          <div className="ProfileHeaderPostsCnt">posts: {postsCnt}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
