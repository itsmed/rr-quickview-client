import React, { Component } from 'react';

class UserDetails extends Component {
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
      <img
        src={user.picture}
        style={{width: '100px'}} 
      />
      <br />
      <label>Id: </label>{user._id}<br />
      <label>Active: </label>{user.isActive.toString()}<br />
      <label>Registered: </label>{user.registered}<br />
      <label>First Name: </label>{user.name.first}<br />
      <label>Last Name: </label>{user.name.last}<br />
      <label>Balance: </label>{user.balance}<br />
      <label>Email: </label>{user.email}<br />
      <label>Phone: </label>{user.phone}
      <label>Address: </label>{user.address}<br />
      <hr />
    </div>;
  }
}

export default UserDetails;
