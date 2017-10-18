import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Net from '../../common/Net';
import Token from '../../common/Token';

class Home extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            redirect: false
        };
    }

    componentWillMount() {
        if (!Token.exists()) {
            this.setState({
                redirect: true
            });
        }
    }

    componentDidMount() {
        Net.get('api/IdentityPlayer').then((player) => {
            console.log(player);
        });
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to='/login' />);
        }

        return (
            <div className="home">
              <h2>Home</h2>
            </div>
            );
    }
}

export default Home;