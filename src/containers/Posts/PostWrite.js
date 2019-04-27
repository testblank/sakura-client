import React, { Component } from "react";
import { writePost } from "../../lib/api/post";
import { PostWriteButton, PostWriteInput } from "components/Posts";

class PostWrite extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }
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
  textChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    // console.log(this.state)
  };
  fileChange = e => {
    console.log(e.target.files[0]);
    this.setState({
      photo: e.target.files[0].name
    });
  }
  writePost = async () => {
    const { username, title, text, photo } = this.state;
    if (username === "" || title === "" || text === "") {
      this.setState({
        isError: true,
        errMessage: "not allowed empty input"
      });
      return;
    }
    
    const newPost = new FormData();
    newPost.set("username",username);
    newPost.set("title",title);
    newPost.set("text",text);
    newPost.set("photo",photo,photo);
    // const newPost = {
    //   username,
    //   title,
    //   text,
    //   photo
    // };
    console.log(newPost.get('username'));
    try {
      await writePost(newPost);
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
        <div style={{ textAlign: "center", paddingTop: "0", padding: "1rem" }}>
          {isError ? errMessage : null}
        </div>
        <PostWriteButton handleClick={writePost} />
      </div>
    );
  }
}
export default PostWrite;
