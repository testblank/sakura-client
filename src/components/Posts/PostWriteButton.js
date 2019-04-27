import React from 'react';
import './Posts.scss';

const PostWriteButton = ({handleClick}) => {
  return (
    <div className="PostWriteButton" onClick={handleClick}>
      WRITE..!
    </div>
  )
}

export default PostWriteButton;