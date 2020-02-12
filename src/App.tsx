import React from 'react';
import {
  BrowserRouter as Router,
  // Switch,
  // Route,
  // Link
} from 'react-router-dom';
// import { connect } from 'react-redux';
import withAuth from './components/shared/hoc/withAuth';
import { AuthState } from './types';
import './App.scss';
import UIImg from './static/ui.png';

type State = {};

class App extends React.PureComponent<AuthState, State> {
  componentDidMount() {
    if (process.env.REACT_APP_DISABLE_AUTH === 'true') {
      console.group();
      console.warn('Authentication is disabled for development purposes');
      console.warn('Change value of REACT_APP_DISABLE_AUTH to change this behaviour');
      console.groupEnd();
    }
  }

  render() {
    return (
      <Router>
        <div className="app">
          <img alt="UI concept" src={UIImg} />
        </div>
      </Router>
    );
  }
}

export default withAuth(App);