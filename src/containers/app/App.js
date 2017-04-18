import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import { connect } from 'react-redux';
import { checkToken } from '../../actions';

// import './App.css';

import Login from '../login/Login';
import Landing from '../../components/landing/Landing';
import Header from '../header/Header';
import Dashboard from '../dashboard/Dashboard';
import NoMatch from '../../components/noMatch/NoMatch';


const FetchingModal = (props) => (
  <div style={{
    minHeight: '400px',
    width: '100%',
    zIndex: 9999,
    backgroundColor: 'black',
    opacity: '0.7',
    color: 'white'
  }}>
    <h1>Loading</h1>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.checkToken();
  }

  render() {
    return <div>
      {
        this.props.isFetching ?
        <FetchingModal />
        :
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/dashboard" render={ () => (
                this.props.isAuth ? 
                  <Dashboard /> 
                  : <Redirect to="/login" />
              )} />
              <Route path="/login" component={Login} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      }
    </div>
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  isFetching: state.isFetching,
});

export default connect(mapStateToProps, { checkToken })(App);
