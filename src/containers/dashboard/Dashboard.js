import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  requestCollectionData,
  updateSearchCategory
} from '../../actions';

import SplitPane from 'react-split-pane';

import EmployeeDetails from '../../components/employee-details/EmployeeDetails';
import UserDetails from '../../components/user-details/UserDetails';
import SearchResults from '../../components/search-results/SearchResults';
import TransactionDetails from '../../components/transaction-details/TransactionDetails';

import './dashboard.css';

class DashBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      filteredResults: [],
      selectedContainer: '',
      recordResults1: null,
      recordResults2: null,
    };

    this.updateCategory = this.updateCategory.bind(this);
    this.updateSelectedRecord = this.updateSelectedRecord.bind(this);
    this.selectContainer = this.selectContainer.bind(this);


    this.requestDataList = this.requestDataList.bind(this);
  }

  componentDidMount() {
    this.setState({
      selectedContainer: this.refs.container1,
    });
    this.refs.idSearch.value = '';
    this.refs.idSearch.focus();
  }

  updateCategory(category) {
    this.props.updateSearchCategory(category);
    this.requestDataList(category);
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

  requestDataList(category) {
    return this.props.requestCollectionData(category, 'all');
  }

  render() {
    const { searchResults, recordResults1, recordResults2 } = this.state;
    const { category, users, transactions, employees, filteredResults } = this.props;
    return <div>
      <SplitPane split="vertical" minSize={10} defaultSize={150}>
          <div style={{backgroundColor: 'palegreen'}} className="overflow-container">
            <div>
            <label>Set Category</label>
            <ul className="side_nav">
              {
                this.props.categories.map(c => <li key={c} className="side_nav_items"><button onClick={ () => this.updateCategory(c) }>{c.toUpperCase()}</button></li>)
              }
            </ul>
              <input
                type="text"
                ref="idSearch"
                placeholder="Id"
              />
              <input
                type="text"
                ref="nameSearch"
                placeholder="Name"
              />
              <input
                type="text"
                ref="emailSearch"
                placeholder="Email"
              />
              <input
                type="text"
                ref="phoneSearch"
                placeholder="Phone"
              />
              <input
                type="text"
                ref="userIdSearch"
                placeholder="Transactions By User Id"
              />
              { this.state.category === 'employees' ?
                  <input
                    type="text"
                    ref="permissionsSearch"
                    placeholder="Permissions"
                  />
                : ''
              }
            </div>
            <h2>Filtered Search Results</h2>
            <div id="filtered-results" className="overflow-container">
             { <SearchResults
                searchResults={ filteredResults }
                category={ category }
                updateSelectedRecord={ this.updateSelectedRecord }
              /> }
            </div>
          </div>
          <SplitPane split="horizontal" minSize={10} defaultSize={350}>
              <div style={{backgroundColor: 'lavender'}} className="overflow-container">
                <div>
                  <h2>{ category.toUpperCase() } Search Results</h2>
                  <SearchResults
                    searchResults={ this.props[category] }
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
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    category: state.category,
    categories: state.searchCategories,
    employees: state.data.employees,
    filteredResults: state.data.filteredResults,
    transactions: state.data.transactions,
    users: state.data.users,
  };
}

export default connect(mapStateToProps, { requestCollectionData, updateSearchCategory })(DashBoard);
