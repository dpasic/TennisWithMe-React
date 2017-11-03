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

const styles = {
    signIn: {
        padding: '6px 10% 0 10%',
        height: '100%',
        title: {
            color: '#8D8D8D',
            textAlign: 'center'
        }
    },
    loginButton: {
        margin: '30px 0 30px 0',
        width: '100%'
    }
};

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
                  <Col sm={ 12 } md={ 6 } mdPush={ 3 } className="loginForm">
                  <Paper style={ styles.signIn }>
                    <h2 style={ styles.signIn.title }>Tennis With Me</h2>
                    <TextField name="username" value={ this.state.loginInfo.username } floatingLabelText="Username" onChange={ this.fieldValueChange } fullWidth={ true } />
                    <TextField name="password" type="password" value={ this.state.loginInfo.password } floatingLabelText="Password" onChange={ this.fieldValueChange } fullWidth={ true }
                    />
                    <RaisedButton style={ styles.loginButton } label="Log In" primary={ true } onClick={ this.logIn } />
                  </Paper>
                  </Col>
                </Row>
              </Grid>
            </div>
            );
    }
}

export default Login;