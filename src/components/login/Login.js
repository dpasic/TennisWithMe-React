import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Net from '../../common/Net';

class Login extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            loginInfo: {
                username: '',
                password: ''
            }
        };

        this.logIn = this.logIn.bind(this);
        this.fieldValueChange = this.fieldValueChange.bind(this);
    }

    logIn() {
        Net.get('http://ip.jsontest.com/')
            .then((body) => {
            });
        Net.post('https://jsonplaceholder.typicode.com/posts', {
            userId: 1,
            id: 1,
            title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
        });
    }

    fieldValueChange(event, value) {
        const field = event.target.name;
        let loginInfo = this.state.loginInfo;
        loginInfo[field] = value;
        this.setState({
            loginInfo
        });
    }

    render() {
        return (
            <div className="login">
              <Paper>
                <TextField name="username" value={ this.state.loginInfo.username } floatingLabelText="Username" onChange={ this.fieldValueChange } fullWidth={ true } />
                <TextField name="password" value={ this.state.loginInfo.password } floatingLabelText="Password" onChange={ this.fieldValueChange } fullWidth={ true } />
                <RaisedButton label="Login" primary={ true } onClick={ this.logIn } />
              </Paper>
            </div>
            );
    }
}

export default Login;