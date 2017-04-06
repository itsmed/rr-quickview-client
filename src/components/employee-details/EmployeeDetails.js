import React, { Component } from 'react';

class EmployeeDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  handleSelect() {
    return this.props.updateSelectedRecord('employee', this.props.employee);
  }

  toggleEditMode() {
    this.setState({
      editMode: !this.state.editMode,
    });
  }

  render() {
    const { employee } = this.props;

    return <div onClick={ this.handleSelect }>
      <button onClick={ this.toggleEditMode }>{ this.state.editMode ? 'Save' : 'Edit' }</button>
      { this.state.editMode ?
          <div>
            <label>Id: </label>{employee._id}<br />
            <label>First Name: </label><input type="text" style={{width: '100%'}} placeholder={employee.name.first} /><br />
            <label>Last Name: </label><input type="text" style={{width: '100%'}} placeholder={employee.name.last} /><br />
            <label>Permission: </label><input type="text" style={{width: '100%'}} placeholder={employee.permissions} /><br />
            <label>Email: </label><input type="text" style={{width: '100%'}} placeholder={employee.email} /><br />
            <label>Phone: </label><input type="text" style={{width: '100%'}} placeholder={employee.phone} />
            <hr />
          </div>
        :
          <div>
            <label>Id: </label>{employee._id}<br />
            <label>First Name: </label>{employee.name.first}<br />
            <label>Last Name: </label>{employee.name.last}<br />
            <label>Permission: </label>{employee.permissions}<br />
            <label>Email: </label>{employee.email}<br />
            <label>Phone: </label>{employee.phone}
            <hr />
          </div>
      }
    </div>;
  }
}

export default EmployeeDetails;
