import React, { Component } from 'react';
// import axios from 'axios';

import { connect } from 'react-redux';
import { makeTokenRequest, checkToken, unauthUser } from '../../actions';

import Header from '../header/Header';

// import { TestApiRouteBase } from '../../api-routes';

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
    // this.handleSignOut = this.handleSignOut.bind(this);
    this.displayAuthError = this.displayAuthError.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
  }
    componentWillMount() {
      this.props.checkToken();
      // if (this.props.auth.user) {
      //   this.
      // }
    }

  componentWillShouldProps(one, two) {
    console.log('args', arguments);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.isAuth) {
      this.props.history.push('/app')
    }
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
    this.props.makeTokenRequest(username, password);
    if(this.props.isAuth) {
      this.props.history.push('/app');
    }
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
    console.log('thi', this.props);
    return <div style={{display: 'flex', flexDirection: 'column'}}>
      <Header />
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
    </div>;
  }
}

const mapStateToProps = state => ({
  isAuth: state.isAuth,
  user: state.user
});

export default connect(mapStateToProps, { checkToken, makeTokenRequest, unauthUser })(Login);
