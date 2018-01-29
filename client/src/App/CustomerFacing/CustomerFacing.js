import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './CustomerFacing.scss';

import Home from './Home/Home';
import ScopingSurvey from './ScopingSurvey/ScopingSurvey';

class CustomerFacingApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <BrowserRouter>
        <main style={{ height: '100%' }}>
          <Route path="/" exact
            render={(props) => (
              <Home
                dataSrcs={this.props.dataSrcs}
              />
            )}
          />
          <Route path="/onboarding" exact
            render={(props) => (
              <ScopingSurvey
                dataSrcs={this.props.dataSrcs}
              />
            )}
          />
        </main>
      </BrowserRouter>
    );
  }
}

export default CustomerFacingApp;
