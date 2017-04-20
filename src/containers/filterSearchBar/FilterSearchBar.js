import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  requestCollectionData,
} from '../../actions';

class FilterSearchBar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.refs.idSearch.value = '';
    this.refs.idSearch.focus();
  }

  render() {
    return <div>
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
      { this.props.category === 'employees' ?
          <input
            type="text"
            ref="permissionsSearch"
            placeholder="Permissions"
          />
        : ''
      }
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    category: state.category,
  };
}

export default connect(mapStateToProps, { requestCollectionData })(FilterSearchBar);
