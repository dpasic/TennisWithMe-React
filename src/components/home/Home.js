import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { PieChart, Pie, Cell } from 'recharts';

import Net from '../../common/Net';
import Token from '../../common/Token';

// https://material.io/guidelines/style
class Home extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            redirect: false,
            pieData: []
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
        if (this.state.redirect) {
            return;
        }

        Net.get('api/IdentityPlayer').then((player) => {
            var pieData = [{
                name: 'Wins',
                value: player.WonGames,
                color: '#4CAF50'
            }, {
                name: 'Loses',
                value: player.LostGames,
                color: '#F44336'
            }];

            this.setState({
                pieData: pieData
            });
        });
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to='/login' />);
        }

        return (
            <div className="home">
              <PieChart width={ 730 } height={ 250 }>
                <Pie data={ this.state.pieData } dataKey="value" nameKey="name" legendType="line" label={ true } cx="50%" cy="50%" outerRadius={ 50 } fill="#8884d8">
                  { this.state.pieData.map((item) => <Cell key={ item.name } fill={ item.color } />) }
                </Pie>
              </PieChart>
            </div>
            );
    }
}

export default Home;