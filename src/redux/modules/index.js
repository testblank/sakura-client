import { combineReducers } from "redux";
import base from "./base";
import auth from "./auth";
import user from "./user";
import post from "./post";
import { penderReducer } from "redux-pender";

export default combineReducers({
  base,
  auth,
  user,
  post,
  pender: penderReducer
});
