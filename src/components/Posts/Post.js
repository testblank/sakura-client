import React, { Component } from "react";
import "./Posts.scss";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: "",
      filter: ""
    };
  }
  handleMouseOver = () => {
    this.setState({
      isVisible: "visible",
      filter: `blur(2px) brightness(0.8)`
    });
  };
  handleMouseOut = () => {
    this.setState({
      isVisible: "hidden",
      filter: "none"
    });
  };
  handleClick = () => {
    console.log('clicked')
  }
  render() {
    const { isEdited, photo, tags, text, title, username } = this.props;
    const { handleClick, handleMouseOut, handleMouseOver } = this;
    const { isVisible, filter } = this.state;
    return (
      <div
        className="Post"
        onClick={handleClick}
        onMouseOut={handleMouseOut}
        onMouseOver={handleMouseOver}
      >
        <div className="PostInfo" style={{ visibility: isVisible }}>
          <span className="PostInfoTitle">
            {title === "" ? "defaultTitle!" : title}
          </span>
          <div>
            <span className="PostInfoUsername">
              {typeof username === "" || null || undefined ? "guest" : username}
            </span>
            <br />
            <span>#{tags === "" ? "defaultTags!" : tags}</span>
          </div>
        </div>
        <img
          style={{ filter: filter }}
          src={photo}
          alt={tags === "" ? "defaultTags!" : tags}
        />
      </div>
    );
  }
}
export default Post;
