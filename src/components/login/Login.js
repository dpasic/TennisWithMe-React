import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            loginInfo: {
                username: '',
                password: ''
            }
        }

        this.logIn = this
            .logIn
            .bind(this);
    }

    logIn() {
        console.log(this.state.loginInfo.username + ' - ' + this.state.loginInfo.password);
    }

    render() {
        return (
            <div className="login">
                <Paper>
                    <TextField
                        name="username"
                        value={this.state.loginInfo.username}
                        floatingLabelText="Username"
                        fullWidth={true}/>
                    <TextField
                        name="password"
                        value={this.state.loginInfo.password}
                        floatingLabelText="Password"
                        fullWidth={true}/>
                    <RaisedButton label="Login" primary={true} onClick={this.logIn}/>
                </Paper>
            </div>
        );
    }
}

export default Login;