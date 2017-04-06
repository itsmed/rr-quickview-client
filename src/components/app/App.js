import React, { Component } from 'react'
import axios from 'axios';
import SplitPane from 'react-split-pane';

import './App.css';
import { TestApiRouteBase } from '../../api-routes';

import EmployeeDetails from '../employee-details/EmployeeDetails';
import EmployeeRecord from '../employee-record/EmployeeRecord';
import UserDetails from '../user-details/UserDetails';
import UserRecord from '../user-record/UserRecord';
import SearchResults from '../search-results/SearchResults';
import TransactionDetails from '../transaction-details/TransactionDetails';
import TransactionRecord from '../transaction-record/TransactionRecord';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: 'users',
      searchResults: [],
      filteredResults: [],
      selectedContainer: '',
      recordResults1: null,
      recordResults2: null,
    };

    this.updateCategory = this.updateCategory.bind(this);
    this.categorySearch = this.categorySearch.bind(this);
    this.updateSelectedRecord = this.updateSelectedRecord.bind(this);
    this.selectContainer = this.selectContainer.bind(this);
    this.handleIdSearch = this.handleIdSearch.bind(this);
    this.rawSearch = this.rawSearch.bind(this);
  }

  componentDidMount() {
    this.categorySearch(this.state.category);
    this.setState({
      selectedContainer: this.refs.container1,
    });
    this.refs.idSearch.value = '';
    this.refs.idSearch.focus();
  }

  updateCategory(e) {
    this.setState({
      category: e.target.textContent.toLowerCase(),
    });
    return this.categorySearch(e.target.textContent.toLowerCase());
  }

  categorySearch(category) {
    axios.get(TestApiRouteBase.concat(category, '/all'))
      .then(({data}) => this.setState({
        searchResults: data.data,
      }))
      .catch(err => console.log('err', err));
  }

  handleIdSearch() {
    let term = this.refs.idSearch.value.trim();

    axios.get(TestApiRouteBase.concat(this.state.category, '/id/', term))
      .then(({data}) => {
        this.setState({
          filteredResults: [ data.data ]
        })
      })
      .catch(err => console.warn('error in handle id search', err.message));
  }

  rawSearch(field) {
    // http://localhost:3000/api/users/search/name/:name
    const targetRef = field.concat('Search');
    
    let term = this.refs[targetRef].value.trim();
    let url = TestApiRouteBase.concat(this.state.category, '/search/', field, '/', term);

    return axios.get(url)
      .then(({data}) => {
        this.setState({
          filteredResults: data.data,
        });
      })
      .catch(err => console.warn('error in raw serch', err.message));
  }

  updateSelectedRecord(category, record) {
    if (this.state.selectedContainer.id === 'container1') {
      this.setState({
        recordResults1: {
          category,
          record
        }
      });
    } else {
      this.setState({
        recordResults2: {
          category,
          record
        }
      });
    }
  }

  selectContainer(ref) {
    const container = 'container'.concat(ref.toString());
    this.setState({
      selectedContainer: this.refs[container],
    });
  }

  render() {
    const { category, searchResults, filteredResults, recordResults1, recordResults2 } = this.state;

    return (
      <div>
        <h1>quickView</h1>
        <SplitPane split="vertical" minSize={10} defaultSize={150}>
            <div style={{backgroundColor: 'palegreen'}} className="overflow-container">
              <div>
              <ul>
                <li style={{margin: '10px'}} onClick={ this.updateCategory }>Users</li>
                <li style={{margin: '10px'}} onClick={ this.updateCategory }>Transactions</li>
                <li style={{margin: '10px'}} onClick={ this.updateCategory }>Employees</li>
              </ul>
                <input
                  type="text"
                  ref="idSearch"
                  placeholder="Id"
                  onChange={ this.handleIdSearch }
                />
                <input
                  type="text"
                  ref="nameSearch"
                  placeholder="Name"
                  onChange={ () => this.rawSearch('name') }
                />
                <input
                  type="text"
                  ref="emailSearch"
                  placeholder="Email"
                  onChange={ () => this.rawSearch('email') }
                />
                <input
                  type="text"
                  ref="phoneSearch"
                  placeholder="Phone"
                  onChange={ () => this.rawSearch('phone') }
                />
                { this.state.category === 'employees' ?
                    <input
                      type="text"
                      ref="permissionsSearch"
                      placeholder="Permissions"
                      onChange={ () => this.rawSearch('permissions') }
                    />
                  : ''
                }
              </div>
              <h2>Filtered Search Results</h2>
              <div id="filtered-results" className="overflow-container">
                <SearchResults
                  searchResults={ filteredResults }
                  category={ category }
                  updateSelectedRecord={ this.updateSelectedRecord }
                />
              </div>
            </div>
            <SplitPane split="horizontal" minSize={10} defaultSize={350}>
                <div style={{backgroundColor: 'lavender'}} className="overflow-container">
                  <div>
                    <h2>{ category.toUpperCase() } Search Results</h2>
                    <SearchResults
                      searchResults={ searchResults }
                      category={ category }
                      updateSelectedRecord={ this.updateSelectedRecord }
                    />
                  </div>
                </div>
                <div style={{backgroundColor: 'mediumaquamarine', zIndex: '999'}}>
                  <SplitPane split="vertical" minSize={150} defaultSize={550}>
                     <div 
                      ref="container1"
                      id="container1"
                      onClick={ () => this.selectContainer(1) }
                      className="selected-container overflow-container" style={{backgroundColor: 'lightcyan'}}
                      >
                       {
                        recordResults1 && recordResults1.category === 'user' ? 
                          <UserDetails
                            updateSelectedRecord={ this.updateSelectedRecord }
                            user={recordResults1.record} />
                          : recordResults1 && recordResults1.category === 'employee' ? 
                          <EmployeeDetails
                            updateSelectedRecord={ this.updateSelectedRecord }
                            employee={recordResults1.record} />
                          : recordResults1 && recordResults1.category === 'transaction' ? 
                          <TransactionDetails
                            updateSelectedRecord={ this.updateSelectedRecord }
                            transaction={recordResults1.record} />
                          : ''
                       }
                     </div>
                     <div
                      ref="container2"
                      id="container2"
                      onClick={ () => this.selectContainer(2) }
                      className="selected-container overflow-container"
                      style={{backgroundColor: 'oldlace'}}
                      >
                       {
                        recordResults2 && recordResults2.category === 'user' ? 
                          <UserDetails
                            updateSelectedRecord={ this.updateSelectedRecord }
                            user={recordResults2.record} />
                          : recordResults2 && recordResults2.category === 'employee' ? 
                          <EmployeeDetails
                            updateSelectedRecord={ this.updateSelectedRecord }
                            employee={recordResults2.record} />
                          : recordResults2 && recordResults2.category === 'transaction' ? 
                          <TransactionDetails
                            updateSelectedRecord={ this.updateSelectedRecord }
                            transaction={recordResults2.record} />
                          : ''
                       }
                     </div>
                 </SplitPane>
                </div>
            </SplitPane>
        </SplitPane>
      </div>
    )
  }
}

export default App;
