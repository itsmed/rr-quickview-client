import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      dashboard
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps)(DashBoard);
