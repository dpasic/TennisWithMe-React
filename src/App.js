import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { orange900 } from 'material-ui/styles/colors';

import Home from './components/home/Home';
import Login from './components/login/Login';

import Colors from './common/Colors';

// https://cimdalli.github.io/mui-theme-generator/
class App extends Component {

    getChildContext() {
        baseTheme.palette.primary1Color = baseTheme.palette.accent1Color = baseTheme.palette.pickerHeaderColor = Colors.orange;
        baseTheme.palette.primary2Color = orange900;

        return {
            muiTheme: getMuiTheme(baseTheme)
        };
    }

    render() {
        return (
            <Router>
              <div>
                <Route exact path="/" component={ Home } />
                <Route path="/login" component={ Login } />
                <Route path="/home" component={ Home } />
              </div>
            </Router>
            );
    }
}

App.childContextTypes = {
    muiTheme: PropTypes.object.isRequired
};

export default App;