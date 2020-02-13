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
import print from './helpers/print';
import withUIHelp from './components/shared/hoc/withUIHelp';

type State = {};

class App extends React.PureComponent<AuthState, State> {

  componentDidMount() {
    if (process.env.REACT_APP_DISABLE_AUTH === 'true') {
      print.authIsDisabled();
    }
  }

  render() {
    return (
      <Router>
        <div className="app">
        </div>
      </Router>
    );
  }
}

export default withUIHelp(withAuth(App));