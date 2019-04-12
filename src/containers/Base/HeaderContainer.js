import React, { Component } from "react";
import Header, {
  LoginButton,
  ProfileButton,
  ProfileMenu
} from "components/Base/Header";
import { connect } from "react-redux";
import * as userActions from "redux/modules/user";
import { bindActionCreators } from "redux";
import storage from "lib/storage";

class HeaderContainer extends Component {
  state = {
    isOpened: false
  };
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
  handleMenuOpen = () => {
    if (!this.state.isOpened) {
      this.setState({
        isOpened: true
      });
    } else {
      this.setState({
        isOpened: false
      });
    }
    console.log(this.state.isOpened)
  };
  render() {
    const { visible, user } = this.props;
    if (!visible) {
      return null;
    }
    const {isOpened} = this.state;
    const { handleMenuOpen, handleLogout } = this;
    return (
      <Header>
        {user.get("logged") ? (
          <ProfileButton
            username={user.getIn(["loggedInfo", "username"])}
            thumbnail={user.getIn(["loggedInfo", "thumbnail"])}
            logout={handleLogout}
            menuToggle={handleMenuOpen}
            isOpened={isOpened}
            menu={<ProfileMenu />}
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
