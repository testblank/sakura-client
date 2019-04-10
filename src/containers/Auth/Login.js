import React, { Component } from "react";
import {
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink,
  AuthError
} from "components/Auth";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as authActions from "redux/modules/auth";
import * as userActions from "redux/modules/user";
import storage from "lib/storage";
import queryString from "query-string";

class Login extends Component {
  componentDidMount() {
    const { location } = this.props;
    const query = queryString.parse(location.search);

    if (query.expired !== undefined) {
      this.setError("session has expired, please logIn");
    }
  }

  handleChange = e => {
    const { AuthActions } = this.props;
    const { name, value } = e.target;

    AuthActions.changeInput({
      name,
      value,
      form: "login"
    });
  };
  componentWillUnmount() {
    const { AuthActions } = this.props;
    AuthActions.initializeForm("login");
  }
  setError = message => {
    const { AuthActions } = this.props;
    AuthActions.setError({
      form: "login",
      message
    });
    return false;
  };
  handleLocalLogin = async () => {
    const { form, AuthActions, UserActions, history } = this.props;
    const { email, password } = form.toJS();

    try {
      await AuthActions.localLogin({ email, password });
      const loggedInfo = this.props.result.toJS();

      UserActions.setLoggedInfo(loggedInfo);
      history.push("/");
      storage.set("loggedInfo", loggedInfo);
    } catch (error) {
      console.log(error);
      this.setError("invalied user");
    }
  };

  render() {
    const { email, password } = this.props.form.toJS();
    const { handleChange, handleLocalLogin } = this;
    const { error } = this.props;
    return (
      <AuthContent title="logIn">
        <InputWithLabel
          onChange={handleChange}
          value={email}
          label="email"
          name="email"
          placeholder="email"
        />
        <InputWithLabel
          onChange={handleChange}
          value={password}
          label="password"
          name="password"
          placeholder="password"
          type="password"
        />
        {error && <AuthError>{error}</AuthError>}
        <RightAlignedLink to="/auth/register">signIn</RightAlignedLink>
        <AuthButton onClick={handleLocalLogin}>logIn</AuthButton>
      </AuthContent>
    );
  }
}

export default connect(
  state => ({
    form: state.auth.getIn(["login", "form"]),
    error: state.auth.getIn(["login", "error"]),
    result: state.auth.get("result")
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(Login);
