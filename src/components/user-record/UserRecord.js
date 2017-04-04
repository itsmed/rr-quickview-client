import React, { Component } from 'react';

class UserRecord extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { user } = this.props;
    return <div>
      <label>Name: </label>{user.full_name}<br />
      <label>Id: </label>{user._id}<br />
      <label>Email: </label>{user.email}<br />
      <hr />
    </div>;
  }
}

export default UserRecord;
