import React, { Component } from "react";
import PostsWrapper from "components/Posts";
import { PostWrite } from "containers/Posts";

export default class Write extends Component {
  render() {
    return (
      <div>
        <PostsWrapper>
          <PostWrite />
        </PostsWrapper>
      </div>
    );
  }
}
