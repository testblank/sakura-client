import React, { Component } from "react";
import { PostsSearchInput } from "components/Posts";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as postActions from "redux/modules/post";
import { Post } from "components/Posts";
import { PostsArrayWrapper } from "components/Posts";

class PostsList extends Component {
  state = {
    posts: [],
    hover: false,
    keyword: ""
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
    const { name, value } = e.target;
    this.setState({
      [name]: value
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
    const { keyword, posts } = this.state;
    const { handleChange } = this;
    const postsArray = posts.map(post => (
      <Post
        key={post._id}
        date={post.date.created}
        isEdited={post.isEdited}
        photo={post.photo}
        tags={post.tags}
        text={post.text}
        title={post.title}
        username={post.username}
      />
    ));
    const filter = posts.filter(post => post.title.indexOf(keyword) !== -1);
    const filteredArray = filter.map(post => (
      <Post
        key={post._id}
        date={post.date.created}
        isEdited={post.isEdited}
        photo={post.photo}
        tags={post.tags}
        text={post.text}
        title={post.title}
        username={post.username}
      />
    ));

    return (
      <div>
        <div>
          <PostsSearchInput
            onChange={handleChange}
            value={keyword}
            name="keyword"
            placeholder="search by title"
          />
        </div>
        <PostsArrayWrapper
          children={keyword === "" ? postsArray : filteredArray}
        />
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
