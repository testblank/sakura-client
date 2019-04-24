import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Home, Auth, Posts, Profile, About } from "./pages";
import HeaderContainer from "./containers/Base/HeaderContainer";

import storage from "lib/storage";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "redux/modules/user";

import { TinyButton as ScrollUpButton } from "react-scroll-up-button";

class App extends Component {
  initializeUserInfo = async () => {
    const loggedInfo = storage.get("loggedInfo");
    if (!loggedInfo) {
      return;
    }
    const { UserActions } = this.props;
    UserActions.setLoggedInfo(loggedInfo);
    try {
      await UserActions.checkStatus();
    } catch (error) {
      storage.remove("loggedInfo");
      window.location.href = "/auth/login?expired";
    }
  };
  componentDidMount = () => {
    this.initializeUserInfo();
  };

  render() {
    const btnStyle = {
      borderRadius: "50%",
      background: "rgba(230,73,128,0.4)",
      fill: "white",
      width: "3rem",
      height: "3rem",
      padding: ".5rem",
      paddingBottom: "1rem",
      bottom: "3.5rem"
    };
    return (
      <div>
        <HeaderContainer />
        {/* <PostContainer /> */}
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/posts" component={Posts} />
        <Route path="/profile" component={Profile} />
        <Route path="/about" component={About} />
        <ScrollUpButton style={btnStyle} />
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(App);
