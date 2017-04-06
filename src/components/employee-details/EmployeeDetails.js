import React, { Component } from 'react';

class EmployeeDetails extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect() {
    return this.props.updateSelectedRecord('employee', this.props.employee);
  }

  render() {
    const { employee } = this.props;

    return <div onClick={ this.handleSelect }>
      <label>Id: </label>{employee._id}<br />
      <label>First Name: </label>{employee.name.first}<br />
      <label>Last Name: </label>{employee.name.last}<br />
      <label>Permission: </label>{employee.permissions}<br />
      <label>Email: </label>{employee.email}<br />
      <label>Phone: </label>{employee.phone}
      <hr />
    </div>;
  }
}

export default EmployeeDetails;
