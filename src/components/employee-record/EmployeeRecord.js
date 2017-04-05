import React, { Component } from 'react';

class EmployeeRecord extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect() {
    return this.props.handleSelect('employee', this.props.employee._id);
  }

  render() {
    const { employee } = this.props;
    return <div onClick={ this.handleSelect }>
      <label>Name: </label>{employee.full_name}<br />
      <label>Id: </label>{employee._id}<br />
      <label>Email: </label>{employee.email}<br />
      <hr />
    </div>;
  }
}

export default EmployeeRecord;
