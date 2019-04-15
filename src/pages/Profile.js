import React, { Component } from "react";
import { ProfileHeader } from "components/Profile";

export default class Profile extends Component {
  render() {
    const loggedInfo = localStorage.loggedInfo;
    const thumbnail = JSON.parse(loggedInfo).thumbnail;
    const username = JSON.parse(loggedInfo).username;
    return (
      <div>
        <ProfileHeader thumbnail={thumbnail} username={username} />
      </div>
    );
  }
}
