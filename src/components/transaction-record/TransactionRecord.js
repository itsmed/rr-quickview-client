import React, { Component } from 'react';

class TransactionRecord extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { transaction } = this.props;
    console.log(transaction);
    return <div>
      <label>Id: </label>{ transaction._id }<br />
      <label>Amount: </label>{ transaction.amount }<br />
      <hr />
    </div>;
  }
}

export default TransactionRecord;
