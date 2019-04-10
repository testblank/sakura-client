import React, { Component } from "react";
import Header, { LoginButton, ProfileButton } from "components/Base/Header";
import { connect } from "react-redux";
import * as userActions from "redux/modules/user";
import { bindActionCreators } from "redux";
import storage from "lib/storage";

class HeaderContainer extends Component {
  handleLogout = async () => {
    const { UserActions } = this.props;
    try {
      await UserActions.logout();
    } catch (error) {
      console.log(error);
    }

    storage.remove("loggedInfo");
    window.location.href = "/";
  };
  render() {
    const { visible, user } = this.props;
    if (!visible) {
      return null;
    }
    const { handleLogout } = this;
    return (
      <Header>
        {user.get("logged") ? (
          <ProfileButton
            username={user.getIn(["loggedInfo", "username"])}
            thumbnail={user.getIn(["loggedInfo", "thumbnail"])}
            onClick={handleLogout}
          />
        ) : (
          <LoginButton />
        )}
      </Header>
    );
  }
}

export default connect(
  state => ({
    visible: state.base.getIn(["header", "visible"]),
    user: state.user
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(HeaderContainer);
