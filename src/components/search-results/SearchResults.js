import React, { Component } from 'react';

import UserRecord from '../user-record/UserRecord';
import TransactionRecord from '../transaction-record/TransactionRecord';
import EmployeeRecord from '../employee-record/EmployeeRecord';

import './SearchResults.css';

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { updateSelectedRecord, searchResults, category } = this.props;

    return <ul>
      {
        searchResults.map(r => {
            switch(category) {
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