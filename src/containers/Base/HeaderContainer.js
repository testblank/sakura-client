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
      this.setState({
        isOpened: !this.state.isOpened
      });
  };
  handleLinkClick = () => {
    this.setState({
      isOpened: false
    })
  }
  render() {
    const { visible, user } = this.props;
    if (!visible) {
      return null;
    }
    const {isOpened} = this.state;
    const { handleMenuOpen, handleLogout, handleLinkClick } = this;
    return (
      <Header>
        {user.get("logged") ? (
          <ProfileButton
            username={user.getIn(["loggedInfo", "username"])}
            thumbnail={user.getIn(["loggedInfo", "thumbnail"])}
            logout={handleLogout}
            menuToggle={handleMenuOpen}
            isOpened={isOpened}
            menu={<ProfileMenu handleLinkClick={handleLinkClick}/>}
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
