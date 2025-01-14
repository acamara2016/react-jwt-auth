import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import PostListingByUser from "./home/PostListingByUser";
import logo from '../user_profile.svg'

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <img src={logo} style={{width: '200px'}}/>
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
            <p>
            <strong>Email:</strong>{" "}
            {currentUser.email}
          </p>
          {/* <strong>Authorities:</strong> */}
        {/* <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul> */}
        </header>
        {/* <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p> */}
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        {/* <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul> */}
        <PostListingByUser username={currentUser.username}/>
      </div>: null}
      </div>
    );
  }
}
