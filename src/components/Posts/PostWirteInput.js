import React from "react";
import "./Posts.scss";

const PostWriteInput = ({ label, ...elses }) => {
  if (label === "text") {
    return (
      <div className="PostWriteInputWrapper">
        <div className="PostWriteInput">
          <span>{label}</span>
          <textarea {...elses} />
        </div>
      </div>
    );
  }
  return (
    <div className="PostWriteInputWrapper">
      <div className="PostWriteInput">
        <span>{label}</span>
        <input {...elses} />
      </div>
    </div>
  );
};

export default PostWriteInput;
