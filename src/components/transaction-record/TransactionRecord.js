import React, { Component } from 'react';

class TransactionRecord extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect() {
    return this.props.updateSelectedRecord('transaction', this.props.transaction);
  }

  render() {
    const { transaction } = this.props;

    return <div onClick={ this.handleSelect }>
      <label>Id: </label>{ transaction._id }<br />
      <label>Amount: </label>{ transaction.amount }<br />
      <hr />
    </div>;
  }
}

export default TransactionRecord;
