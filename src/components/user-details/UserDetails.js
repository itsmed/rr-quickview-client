import React, { Component } from 'react';

class UserDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  handleSelect() {
    return this.props.updateSelectedRecord('user', this.props.user);
  }

  toggleEditMode() {
    this.setState({
      editMode: !this.state.editMode,
    });
  }

  render() {
    const { user } = this.props;

    return <div onClick={ this.handleSelect }>
      <button onClick={ this.toggleEditMode }>{ this.state.editMode ? 'Save' : 'Edit' }</button>
      { this.state.editMode ?
          <div>
            <img
              src={user.picture}
              style={{width: '100px'}} 
            />
            <br />
            <label>Id: </label>{user._id}<br />
            <label>Active: </label>{user.isActive.toString()} <button>Toggle Active</button><br />
            <label>Registered: </label>{user.registered}<br />
            <label>First Name: </label> <input type="text" style={{width: '100%'}} placeholder={user.name.first} /><br />
            <label>Last Name: </label> <input type="text" style={{width: '100%'}} placeholder={user.name.last} /><br />
            <label>Balance: </label> <input type="text" style={{width: '100%'}} placeholder={user.balance} /><button>Add</button><button>Subtract</button><br />
            <label>Email: </label> <input type="text" style={{width: '100%'}} placeholder={user.email} /><br />
            <label>Phone: </label> <input type="text" style={{width: '100%'}} placeholder={user.phone} /><br />
            <label>Address: </label> <input type="text" style={{width: '100%'}} placeholder={user.address} /><br />
            <hr />
          </div>
        :
          <div>
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
            <label>Balance: </label>${user.balance}<br />
            <label>Email: </label>{user.email}<br />
            <label>Phone: </label>{user.phone}<br />
            <label>Address: </label>{user.address}<br />
            <hr />
          </div>
      }
    </div>
  }
}

export default UserDetails;
