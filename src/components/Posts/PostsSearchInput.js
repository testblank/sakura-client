import React from "react";
import "./Posts.scss";

const PostsSearchInput = ({ ...props }) => {
  return (
    <div className="PostsSearchInputWrapper">
      <input className="PostsSearchInput" {...props} />
    </div>
  );
};

export default PostsSearchInput;
