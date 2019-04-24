import React from "react";
import './Posts.scss';

const PostsWrapper = ({children}) => {
  return (
    <div className="PostsWrapper body">
      {children}
    </div>
  );
};

export default PostsWrapper;
