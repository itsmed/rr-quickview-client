import React, { Component } from 'react'
import axios from 'axios';
import SplitPane from 'react-split-pane';

import './App.css';
import { TestApiRouteBase } from '../../api-routes';

import EmployeeRecord from '../employee-record/EmployeeRecord';
import TransactionRecord from '../transaction-record/TransactionRecord';
import UserRecord from '../user-record/UserRecord';
import SearchResults from '../search-results/SearchResults';

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
    axios.get(TestApiRouteBase.concat(this.state.category, '/id/', this.refs.idSearch.value.trim()))
      .then(({data}) => {
        this.setState({
          filteredResults: [ data.data ]
        })
      })
      .catch(err => console.warn('error in handle id search', err.message));
  }

  rawSearch(field, term) {
    // http://localhost:3000/api/users/search/id/:id
    let url = TestApiRouteBase.concat(this.state.category, '/search/', field, '/', term);
    return axios.get(url)
      .then(({data}) => console.log('resonse from raw serch', data))
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
    const { category, searchResults, recordResults1, recordResults2 } = this.state;

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
              <div>
                <input
                  type="text"
                  ref="idSearch"
                  placeholder="Id"
                  onChange={ this.handleIdSearch }
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
                          <UserRecord
                            updateSelectedRecord={ this.updateSelectedRecord }
                            user={recordResults1.record} />
                          : recordResults1 && recordResults1.category === 'employee' ? 
                          <EmployeeRecord
                            updateSelectedRecord={ this.updateSelectedRecord }
                            employee={recordResults1.record} />
                          : recordResults1 && recordResults1.category === 'transaction' ? 
                          <TransactionRecord
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
                          <UserRecord
                            updateSelectedRecord={ this.updateSelectedRecord }
                            user={recordResults2.record} />
                          : recordResults2 && recordResults2.category === 'employee' ? 
                          <EmployeeRecord
                            updateSelectedRecord={ this.updateSelectedRecord }
                            employee={recordResults2.record} />
                          : recordResults2 && recordResults2.category === 'transaction' ? 
                          <TransactionRecord
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
