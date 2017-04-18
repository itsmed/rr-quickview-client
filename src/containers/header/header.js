import React, { Component } from 'react';
import { connect } from 'react-redux';

import { unauthUser } from '../../actions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleSignOut = this.handleSignOut.bind(this);
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
    </header>;
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.isAuth
  };
}

export default connect(mapStateToProps, { unauthUser })(Header);
