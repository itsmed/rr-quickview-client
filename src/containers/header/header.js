import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Link
} from 'react-router-dom';

import { unauthUser, checkToken } from '../../actions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    this.props.checkToken();
  }

  handleSignOut() {
    this.props.unauthUser();
  }

  render() {
    return <header>
      { this.props.isAuth ?
          <button onClick={ this.handleSignOut }>Sign Out</button>
        : ''
      }
      <nav>
        <ul style={{listStyle: 'none'}}>
          <li><Link to="/">Home</Link></li>
          <li>
            { this.props.isAuth ?
              ''
              :  <Link to="/login">Log In</Link>
            }
          </li> 
          <li>
            { this.props.isAuth ? 
              <Link to="/dashboard">Dashboard</Link>
              : ''
            }
          </li>
        </ul>
      </nav>
    </header>;
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuth
  };
}

export default connect(mapStateToProps, { unauthUser, checkToken })(Header);
