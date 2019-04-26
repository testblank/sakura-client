import React, { Component } from "react";
import { PostsSearchInput } from "components/Posts";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as postActions from "redux/modules/post";
import { Post } from "components/Posts";
import { PostsArrayWrapper } from "../../components/Posts";

class PostsList extends Component {
  state = {
    posts: [],
    hover: false,
  };
  getPostList = async () => {
    const { PostActions } = this.props;
    try {
      const res = await PostActions.getPostList();
      const postList = res.data;

      for (const key in postList) {
        if (postList.hasOwnProperty(key)) {
          this.setState({
            posts: this.state.posts.concat([
              {
                date: postList[key].date,
                isEdited: postList[key].is_edited,
                photo: postList[key].photo,
                tags: postList[key].tags,
                text: postList[key].text,
                title: postList[key].title,
                _id: postList[key]._id,
                username: postList[key].username
              }
            ])
          });
        }
      }
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

  handleMouseOver = () => {
    const { hover } = this.state;
    this.setState({
      hover: !hover
    });
  };

  handleMouseOut = () => {
    const { hover } = this.state;
    this.setState({
      hover: !hover
    });
  };

  componentDidMount = () => {
    this.getPostList();
  };

  render() {
    // const isVisible = this.state.hover ? "visible" : "hidden";
    const { title } = this.props.form.toJS();
    const { handleChange, handleMouseOut, handleMouseOver } = this;
    const postsArray = this.state.posts.map(post => (
      <Post
        key={post._id}
        date={post.date.created}
        isEdited={post.isEdited}
        photo={post.photo}
        tags={post.tags}
        text={post.text}
        title={post.title}
        username={post.username}
        // onMouseOut={handleMouseOut}
        // onMouseOver={handleMouseOver}
        // isVisible={isVisible}
      />
    ));
    return (
      <div>
        <PostsSearchInput
          onChange={handleChange}
          value={title}
          name="keyword"
          lable=""
          placeholder="search by title"
        />
        <PostsArrayWrapper children={postsArray} />
      </div>
    );
  }
}

// export default PostsList;
export default connect(
  state => ({
    form: state.post.get("search"),
    list: state.post.get("list")
  }),
  dispatch => ({
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(PostsList);
