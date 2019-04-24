import React, { Component } from "react";
import { PostsSearchInput } from "components/Posts";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as postActions from "redux/modules/post";
// import storage from "lib/storage";

class PostsList extends Component {
  handleGetPostList = async () => {
    const { PostActions } = this.props;

    try {
      await PostActions.getPostList();
      const postInfo = this.props.list.toJS();
      console.log(postInfo)
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = e => {
    const { PostActions } = this.props;
    const { name, value } = e.target;

    PostActions.changeInput({
      name,
      value,
      form: "title"
    });
  };

  componentDidMount = () => {
    this.handleGetPostList();
  };
  
  render() {
    // console.log(this.props.list);
    const { title } = this.props.form.toJS();
    const { handleChange } = this;
    return (
      <PostsSearchInput
        onChange={handleChange}
        value={title}
        name="keyword"
        lable=""
        placeholder="search"
      />
    );
  }
}

export default connect(
  state => ({
    form: state.post.get("search"),
    list: state.post.get("list")
  }),
  dispatch => ({
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(PostsList);
