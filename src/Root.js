import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";


const Root = ({ store }) => {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/" component={App} />
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default Root;
