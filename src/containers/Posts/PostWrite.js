import React, { Component } from "react";
import { writePost } from "../../lib/api/post";
import { PostWriteButton, PostWriteInput } from "components/Posts";

class PostWrite extends Component {
  state = {
    username: "",
    title: "",
    text: "",
    photo: "",
    errMessage: "",
    isError: false
  };
  getUsername = () => {
    const loggedInfo = localStorage.loggedInfo;
    const username = JSON.parse(loggedInfo).username;
    this.setState({
      username: username
    });
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  writePost = async () => {
    const { username, title, text, photo } = this.state;
    if (username === "" || title === "" || text === "") {
      this.setState({
        isError: true,
        errMessage: "not allowed empty input"
      });
      return;
    }
    const {newPost} = {
      username,
      title,
      text,
      photo
    };
    console.log(newPost);
    try {
      await writePost({ newPost });
      this.setState({
        isError: false,
        errMessage: ""
      });
    } catch (error) {
      console.log(error);
    }
    window.history.back();
  };
  componentDidMount = () => {
    this.getUsername();
  };

  render() {
    const { writePost, handleChange } = this;
    const { title, text, photo, isError, errMessage } = this.state;
    return (
      <div>
        <PostWriteInput
          onChange={handleChange}
          value={title}
          label="title"
          name="title"
        />
        <PostWriteInput
          onChange={handleChange}
          value={text}
          label="text"
          name="text"
        />
        <PostWriteInput
          onChange={handleChange}
          value={photo}
          label="photo"
          type="file"
        />
        <div style={{ textAlign: "center", paddingTop: "0", padding: "1rem" }}>
          {isError ? errMessage : null}
        </div>
        <PostWriteButton handleClick={writePost} />
      </div>
    );
  }
}
export default PostWrite;
