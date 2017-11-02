import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Net from '../../common/Net';
import Token from '../../common/Token';

class Login extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            redirect: false,
            loginInfo: {
                username: '',
                password: ''
            }
        };

        this.logIn = this.logIn.bind(this);
        this.fieldValueChange = this.fieldValueChange.bind(this);
    }

    logIn() {
        Net.fetchToken({
            username: this.state.loginInfo.username,
            password: this.state.loginInfo.password
        }).then((token) => {
            Token.save(token);
            this.setState({
                redirect: true
            });
        });
    }

    fieldValueChange(event, value) {
        var field = event.target.name;
        var loginInfo = this.state.loginInfo;
        loginInfo[field] = value;
        this.setState({
            loginInfo
        });
    }

    componentWillMount() {
        if (Token.exists()) {
            this.setState({
                redirect: true
            });
        }
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to='/' />);
        }

        return (
            <div className="login">
              <Grid style={ { marginTop: 50 } }>
                <Row>
                  <Col>
                  <h2>Tennis With Me</h2>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <TextField name="username" value={ this.state.loginInfo.username } floatingLabelText="Username" onChange={ this.fieldValueChange } fullWidth={ true } />
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <TextField name="password" type="password" value={ this.state.loginInfo.password } floatingLabelText="Password" onChange={ this.fieldValueChange } fullWidth={ true } />
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <RaisedButton label="Log In" primary={ true } onClick={ this.logIn } />
                  </Col>
                </Row>
              </Grid>
              <Paper>
              </Paper>
            </div>
            );
    }
}

export default Login;