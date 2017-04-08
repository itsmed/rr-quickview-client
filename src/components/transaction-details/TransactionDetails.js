import React, { Component } from 'react';

class TransactionDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  handleSelect() {
    return this.props.updateSelectedRecord('transaction', this.props.transaction);
  }

  toggleEditMode() {
    this.setState({
      editMode: !this.state.editMode,
    });
  }

  render() {
    const { transaction } = this.props;
    
    return <div onClick={ this.handleSelect } style={{margin: '5px'}}>
      <button onClick={ this.toggleEditMode }>{ this.state.editMode ? 'Save' : 'Edit' }</button>
      { this.state.editMode ?
          <div>
            <label>Id: </label>{transaction._id}<br />
            <label>Date: </label>{transaction.date}<br />
            <label>Amount: </label><input type="text" placeholder={transaction.amount} /><br />
            <label>User Id: </label>{transaction.user_id}<br />
            <button>Refund</button>
          </div>
        :
          <div>
            <label>Id: </label>{transaction._id}<br />
            <label>Date: </label>{transaction.date}<br />
            <label>Amount: </label>${transaction.amount}<br />
            <label>User Id: </label>{transaction.user_id}<br />
            <hr />
          </div>
      }
    </div>;
  }
}

export default TransactionDetails;
