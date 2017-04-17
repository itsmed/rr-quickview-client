import React, { Component } from 'react';
import axios from 'axios';

import { TestApiRouteBase } from '../../api-routes';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authMessage: '',
      isAuth: false,
    }

    this.handleAuthRequest = this.handleAuthRequest.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.displayAuthError = this.displayAuthError.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
  }

  handleAuthRequest(e) {
    let { username, password } = this.refs;
    username = username.value;
    password = password.value;
    this.refs.username.value = '';
    this.refs.password.value = '';
    
    switch(e.target.value.toLowerCase().replace(' ', '')) {
    case 'signin':
      return this.handleSignIn(username, password);
    case 'signup':
      return this.handleSignUp(username, password);
    default:
      return;
    }
  }

  handleSignUp(username, pasword) {}

  handleSignIn(username, password) {
    return axios.post(TestApiRouteBase.concat('auth/signin'), {username, password})
      .then(res => {
        localStorage.setItem('quickview-token', res.data.token);
        this.setState({
          isAuth: !this.state.isAuth
        })
        return this.props.history.push('/app');
      })
      .catch(err => {
        return this.displayAuthError();
      });
  }

  handleSignOut() {
    localStorage.removeItem('quickview-token');
    this.setState({
      isAuth: !this.state.isAuth
    });
  }

  displayAuthError(message = 'Authentication failed, try again') {
    this.setState({
      authMessage: message
    });
    return setTimeout(() => {
      return this.setState({
        authMessage: ''
      })
    }, 5500)
  }

  checkAuth () {
    return localStorage.getItem('quickview-token') === null;
  }

  render() {
    return <div style={{display: 'flex', flexDirection: 'column'}}>
      { 
      this.checkAuth() ?
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <h3>{ this.state.authMessage }</h3>
          <input
            type="text"
            placeholder="username"
            ref="username"
            style={{flex: 1}}
          />
          <input
            type="text"
            placeholder="password"
            ref="password"
            style={{flex: 1}}
          />
          <input
            type="submit"
            value="Sign In"
            onClick={ this.handleAuthRequest }
            style={{flex: 1}}
          />
          <input
            type="submit"
            value="Sign Up"
            onClick={ this.handleAuthRequest }
            style={{flex: 1}}
          />
        </div>
      :
        <button
          style={{flex: 1}}
          onClick={ this.handleSignOut }
        >
        Sign Out</button>
      }
    </div>;
  }
}

export default Login;
