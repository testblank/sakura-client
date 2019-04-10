import React, { Component } from "react";
import {
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink,
  AuthError
} from "components/Auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "redux/modules/auth";
import * as userActions from "redux/modules/user";
import { isEmail, isLength, isAlphanumeric } from "validator";
import debounce from "lodash/debounce";
import storage from "lib/storage";

class Register extends Component {
  setError = message => {
    const { AuthActions } = this.props;
    AuthActions.setError({
      form: "register",
      message
    });
  };
  validate = {
    email: value => {
      if (!isEmail(value)) {
        this.setError("email address in invalied format ");
        return false;
      }
      return true;
    },
    username: value => {
      if (!isAlphanumeric(value) || !isLength(value, { min: 4, max: 15 })) {
        this.setError("id must be 4 to 15 letters or numbers");
        return false;
      }
      return true;
    },
    password: value => {
      if (!isLength(value, { min: 6 })) {
        this.setError("password must be at least 6 characters long");
        return false;
      }
      this.setError(null);
      return true;
    },
    passwordConfirm: value => {
      if (this.props.form.get("password") !== value) {
        this.setError("password and confirmation password do not match");
        return false;
      }
      this.setError(null);
      return true;
    }
  };
  checkEmailExists = debounce(async email => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.checkEmailExists(email);
      if (this.props.exists.get("email")) {
        this.setError("this email is already in use");
      } else {
        this.setError(null);
      }
    } catch (error) {
      console.log(error);
    }
  }, 300);
  checkUsernameExists = debounce(async username => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.checkUsernameExists(username);
      if (this.props.exists.get("username")) {
        this.setError("this id is already in use");
      } else {
        this.setError(null);
      }
    } catch (error) {
      console.log(error);
    }
  }, 300);
  handleChange = e => {
    const { AuthActions } = this.props;
    const { name, value } = e.target;

    AuthActions.changeInput({
      name,
      value,
      form: "register"
    });

    const validation = this.validate[name](value);
    if (name.indexOf("password") > -1 || !validation) {
      return;
    }

    const check =
      name === "email" ? this.checkEmailExists : this.checkUsernameExists;
    check(value);
  };
  handleLocalRegister = async () => {
    const { form, AuthActions, error, history, UserActions } = this.props;
    const { email, username, password, passwordConfirm } = form.toJS();

    const { validate } = this;

    if (error) {
      return;
    }
    if (
      !validate["email"](email) ||
      !validate["username"](username) ||
      !validate["password"](password) ||
      !validate["passwordConfirm"](passwordConfirm)
    ) {
      return;
    }
    try {
      await AuthActions.localRegister({
        email,
        username,
        password
      });
      const loggedInfo = this.props.result.toJS();
      console.log('1111')
      console.log(this.props.toJS());

      storage.set("loggedInfo", loggedInfo);
      UserActions.setLoggedInfo(loggedInfo);
      UserActions.setValidated(true);
      history.push("/"); //가입 성공시 홈으로
    } catch (error) {
      if (error.response.status === 409) {
        const { key } = error.response.data;
        const message =
          key === "email"
            ? "this email is already in use"
            : "this id is already in use";
        return this.setError(message);
      }
      this.setError("unknown error occurred");
    }
  };
  componentWillUnmount() {
    const { AuthActions } = this.props;
    AuthActions.initializeForm("register");
  }

  render() {
    const {
      email,
      username,
      password,
      passwordConfirm
    } = this.props.form.toJS();
    const { handleChange, handleLocalRegister } = this;
    const { error } = this.props;
    return (
      <AuthContent title="signIn">
        <InputWithLabel
          onChange={handleChange}
          value={email}
          label="email"
          name="email"
          placeholder="email"
        />
        <InputWithLabel
          onChange={handleChange}
          value={username}
          label="id"
          name="username"
          placeholder="id"
        />
        <InputWithLabel
          onChange={handleChange}
          value={password}
          label="password"
          name="password"
          placeholder="password"
          type="password"
        />
        <InputWithLabel
          onChange={handleChange}
          value={passwordConfirm}
          label="passwordConfirm"
          name="passwordConfirm"
          placeholder="passwordConfirm"
          type="password"
        />
        {error && <AuthError>{error}</AuthError>}
        <RightAlignedLink to="/auth/login">backTologIn</RightAlignedLink>
        <AuthButton onClick={handleLocalRegister}>signIn</AuthButton>
      </AuthContent>
    );
  }
}

export default connect(
  state => ({
    form: state.auth.getIn(["register", "form"]),
    error: state.auth.getIn(["register", "error"]),
    exists: state.auth.getIn(["register", "exists"]),
    result: state.auth.get("result")
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(Register);
