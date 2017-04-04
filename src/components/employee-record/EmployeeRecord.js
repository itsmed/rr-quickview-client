import React, { Component } from 'react';

class EmployeeRecord extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { employee } = this.props;

    return <div>
      <label>Name: </label>{employee.full_name}<br />
      <label>Id: </label>{employee._id}<br />
      <label>Email: </label>{employee.email}<br />
      <hr />
    </div>;
  }
}

export default EmployeeRecord;
