import React, { Component } from 'react';

class UserRecord extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect() {
    return this.props.updateSelectedRecord('user', this.props.user);
  }

  render() {
    const { user } = this.props;

    return <div onClick={ this.handleSelect }>
      <label>Name: </label>{user.full_name}<br />
      <label>Id: </label>{user.userId}<br />
      <label>Email: </label>{user.email}<br />
      <hr />
    </div>;
  }
}

export default UserRecord;
