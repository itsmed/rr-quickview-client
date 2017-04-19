import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getDataList } from '../../actions';

import SplitPane from 'react-split-pane';

import EmployeeDetails from '../../components/employee-details/EmployeeDetails';
import UserDetails from '../../components/user-details/UserDetails';
import SearchResults from '../../components/search-results/SearchResults';
import TransactionDetails from '../../components/transaction-details/TransactionDetails';

import './dashboard.css'
import axios from 'axios'
const TestApiRouteBase = 'http://localhost:3000/api/';

class DashBoard extends Component {
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
    this.getTransactionsByUserId = this.getTransactionsByUserId.bind(this);


    this.requestDataList = this.requestDataList.bind(this);
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

  getTransactionsByUserId() {
    let url = TestApiRouteBase.concat('transactions/user/id/', this.refs.userIdSearch.value);

    return axios.get(url)
      .then(({data}) => {
        console.log('data from user id', data);
        this.setState({
          filteredResults: data.data,
        })
      })
      .catch(err => console.warn('Error getting user by id', err.message));
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

  /*New*/
  requestDataList(category) {
    this.props.getDataList(category);
  }

  render() {
    const { category, searchResults, filteredResults, recordResults1, recordResults2 } = this.state;

    const { allUsers } = this.props;
    return <div>
      <SplitPane split="vertical" minSize={10} defaultSize={150}>
          <div style={{backgroundColor: 'palegreen'}} className="overflow-container">
            <div>
            <ul className="side_nav">
              {
                this.props.categories.map(c => <li key={c} className="side_nav_items"><button onClick={ () => this.requestDataList(c) }>Set Category {c.toUpperCase()}</button></li>)
              }
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
              <input
                type="text"
                ref="userIdSearch"
                placeholder="Transactions By User Id"
                onChange={ () => this.getTransactionsByUserId() }
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
             {/*} <SearchResults
                searchResults={ filteredResults }
                category={ category }
                updateSelectedRecord={ this.updateSelectedRecord }
              /> */}
            </div>
          </div>
          <SplitPane split="horizontal" minSize={10} defaultSize={350}>
              <div style={{backgroundColor: 'lavender'}} className="overflow-container">
                <div>
                  <h2>{ category.toUpperCase() } Search Results</h2>
                  {/*<SearchResults
                    searchResults={ allUsers }
                    category={ category }
                    updateSelectedRecord={ this.updateSelectedRecord }
                  />*/}
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
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    // allUsers: state.users.allUsers,
    categories: state.searchCategories,
  };
}

export default connect(mapStateToProps, { getDataList })(DashBoard);
