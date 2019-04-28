import React, { Component } from "react";
import { writePost as postAPI } from "../../lib/api/post";
import { PostWriteButton, PostWriteInput } from "components/Posts";

class PostWrite extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      username: "",
      title: "",
      text: "",
      photo: "",
      errMessage: "",
      isError: false
    };
  }
  getUsername = () => {
    const loggedInfo = localStorage.loggedInfo;
    const username = JSON.parse(loggedInfo).username;
    this.setState({
      username: username
    });
  };
  textChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  fileChange = e => {
    e.persist();
    const fileName = JSON.stringify(e.target.files[0].name);
    this.setState({
      photo: fileName
    });
  };
  writePost = async () => {
    const { username, title, text, photo } = this.state;
    console.log(this.state.photo);
    if (username === "" || title === "" || text === "") {
      this.setState({
        isError: true,
        errMessage: "not allowed empty input"
      });
      return;
    }
    const newPost = new FormData();
    newPost.append("username", username);
    newPost.append("title", title);
    newPost.append("text", text);
    newPost.append("photo", photo, photo.name);
    // const newPost = {
    //   username,
    //   title,
    //   text,
    //   photo
    // };
    // console.log(username);
    try {
      await postAPI({username, title, text, photo});
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
    const { writePost, textChange, fileChange } = this;
    const { title, text, isError, errMessage } = this.state;
    return (
      <div>
        {/* <form onSubmit={writePost}> */}
          <PostWriteInput
            onChange={textChange}
            value={title}
            label="title"
            name="title"
          />
          <PostWriteInput
            onChange={textChange}
            value={text}
            label="text"
            name="text"
          />
          <PostWriteInput
            ref={this.fileInput}
            onChange={fileChange}
            // value={photo}
            // name="photo"
            label="photo"
            type="file"
            accept="image/*"
          />
          <div
            style={{ textAlign: "center", paddingTop: "0", padding: "1rem" }}
          >
            {isError ? errMessage : null}
          </div>
          {/* <input type="submit" value="submit" /> */}
          <PostWriteButton handleClick={writePost} />
        {/* </form> */}
      </div>
    );
  }
}
export default PostWrite;
