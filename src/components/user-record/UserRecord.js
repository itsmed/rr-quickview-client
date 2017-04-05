import React, { Component } from 'react';

class UserRecord extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect() {
    return this.props.handleSelect('user', this.props.user._id);
  }

  render() {
    const { user } = this.props;
    return <div onClick={ this.handleSelect }>
      <label>Name: </label>{user.full_name}<br />
      <label>Id: </label>{user._id}<br />
      <label>Email: </label>{user.email}<br />
      <hr />
    </div>;
  }
}

export default UserRecord;
