import React from "react";
import { Link } from "react-router-dom";
import './Header.scss';

const LoginButton = () => {
    return (
      <Link className="LoginButton" to="/auth/login">
        signIn / logIn
      </Link>
    );
}

export default LoginButton;