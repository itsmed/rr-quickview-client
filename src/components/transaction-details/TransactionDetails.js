import React, { Component } from 'react';

class TransactionDetails extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect() {
    return this.props.updateSelectedRecord('transaction', this.props.transaction);
  }

  render() {
    const { transaction } = this.props;
    
    return <div onClick={ this.handleSelect } style={{margin: '5px'}}>
      <label>Id: </label>{transaction._id}<br />
      <label>Date: </label>{transaction.date}<br />
      <label>Amount: </label>{transaction.amount}<br />
      <label>User Id: </label>{transaction.user_id}<br />
      <hr />
    </div>;
  }
}

export default TransactionDetails;
