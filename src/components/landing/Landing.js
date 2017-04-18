import React, { Component } from 'react';

import Header from '../../containers/header/Header';

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      <div>
        <Header />
      </div>
      <h1>Hello World!</h1>
    </div>;
  }
}

export default Landing;
