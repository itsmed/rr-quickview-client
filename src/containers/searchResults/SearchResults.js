import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserRecord from '../../components/user-record/UserRecord';
import TransactionRecord from '../../components/transaction-record/TransactionRecord';
import EmployeeRecord from '../../components/employee-record/EmployeeRecord';

import './SearchResults.css';

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: []
    };
  }

  render() {
    const { updateSelectedRecord, searchResults, searchCategory } = this.props;

    return <ul>
      {
        this.props[this.props.searchCategory].map(r => {
            switch(searchCategory) {
              case 'users':
                return <li key={r._id}>
                  <UserRecord
                    updateSelectedRecord={ updateSelectedRecord }
                    user={r} />
                </li>;
              case 'transactions':
                return <li key={r._id}>
                  <TransactionRecord
                    updateSelectedRecord={ updateSelectedRecord }
                    transaction={r} />
                </li>
              case 'employees':
                return <li key={r._id}>
                  <EmployeeRecord
                    updateSelectedRecord={ updateSelectedRecord }
                    employee={r} />
                  </li>;
              default:
                return <li></li>;
            }
        })
      }
    </ul>
  }
}

const mapStateToProps = state => {
  return {
  searchCategory: state.searchCategory,
  users: state.getUsers
}};


export default connect(mapStateToProps)(SearchResults);
