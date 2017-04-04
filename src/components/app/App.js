import React, { Component } from 'react'
import axios from 'axios';
import SplitPane from 'react-split-pane';

import './App.css';
import { TestApiRouteBase } from '../../api-routes';

import EmployeeRecord from '../employee-record/EmployeeRecord';
import TransactionRecord from '../transaction-record/TransactionRecord';
import UserRecord from '../user-record/UserRecord';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: 'users',
      searchResults: [],
    };

    this.updateCategory = this.updateCategory.bind(this);
    this.categorySearch = this.categorySearch.bind(this);
  }

  componentDidMount() {
    this.categorySearch(this.state.category);
  }

  updateCategory(e) {
    this.setState({
      category: e.target.textContent.toLowerCase(),
    });
    return this.categorySearch(e.target.textContent.toLowerCase());
  }

  categorySearch(category) {
    
    console.log('category', category);
    axios.get(TestApiRouteBase.concat(category, '/all'))
      .then(({data}) => this.setState({
        searchResults: data.data,
      }))
      .catch(err => console.log('err', err));
  }

  render() {
    const { category, searchResults } = this.state;

    return (
      <div>
        <h1>quickView</h1>
        <SplitPane split="vertical" minSize={10} defaultSize={150}>
            <div style={{backgroundColor: 'palegreen'}}>
              <ul>
                <li style={{margin: '10px'}} onClick={ this.updateCategory }>Users</li>
                <li style={{margin: '10px'}} onClick={ this.updateCategory }>Transactions</li>
                <li style={{margin: '10px'}} onClick={ this.updateCategory }>Employees</li>
              </ul>
            </div>
            <SplitPane split="horizontal" minSize={10} defaultSize={150}>
                <div style={{backgroundColor: 'lavender'}} className="overflow-container">
                  <div>
                    <h2>Search Criteria</h2>
                  </div>
                  <div>
                    <h2>{ category.toUpperCase() } Search Results</h2>
                    {
                      searchResults.map(r => {
                        switch(category) {
                        case 'users':
                          return <UserRecord key={r._id} user={r} />;
                        case 'transactions':
                          return <TransactionRecord key={r._id} transaction={r} />
                        case 'employees':
                          return <EmployeeRecord key={r._id} employee={r} />
                        default:
                          return '';
                        }
                      })
                    }
                  </div>
                </div>
                <div style={{backgroundColor: 'mediumaquamarine', zIndex: '999'}}>
                  <SplitPane split="vertical" minSize={150} defaultSize={550}>
                     <div className="selected-container overflow-container" style={{backgroundColor: 'lightcyan'}}>
                       words are wind
                     </div>
                     <div className="selected-container overflow-container" style={{backgroundColor: 'oldlace'}}>
                       she said
                     </div>
                 </SplitPane>
                </div>
            </SplitPane>
        </SplitPane>
      </div>
    )
  }
}

export default App