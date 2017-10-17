import React, { Component } from 'react';
import PropTypes from 'prop-types';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Login from './components/login/Login';

class App extends Component {

  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme)
    };
  }

  render() {
    return (
      <div className="app">
        <Login/>
      </div>
      );
  }
}

App.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default App;