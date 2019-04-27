import React from "react";
import {Link} from 'react-router-dom';
import "./Posts.scss";

const PostsSearchInput = ({ ...props }) => {
  return (
    <div className="PostsSearchInputWrapper">
      <div className="forPosition"/>
      <input className="PostsSearchInput" {...props} />
      <Link className="writeLink" to="/posts/write">WRITE</Link>
    </div>
  );
};

export default PostsSearchInput;
