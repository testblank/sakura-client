import React, { Component } from "react";
import PostsWrapper from "components/Posts";
import { PostsList } from "containers/Posts";
// import { Route } from "react-router-dom";

export default class Posts extends Component {
  render() {
    return (
      <div>
        <PostsWrapper>
          <PostsList />
        </PostsWrapper>
      </div>
    );
  }
}
