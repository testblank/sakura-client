import React from 'react';
import './Posts.scss';

const PostsArrayWrapper =({children}) => {
  return (
    <div className="PostsArrayWrapper">
      {children}
    </div>
  )
}

export default PostsArrayWrapper;
