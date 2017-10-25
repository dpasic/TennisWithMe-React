import React, { Component } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

import Net from '../../common/Net';
import Token from '../../common/Token';

class Profile extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            pieData: []
        };
    }

    componentDidMount() {
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

    //TODO: import Button from 'react-bootstrap/lib/Button';
    //TODO: https://react-bootstrap.github.io/components.html#page-layout
    render() {
        return (
            <div className="profile">
              <PieChart width={ 730 } height={ 250 }>
                <Pie data={ this.state.pieData } dataKey="value" nameKey="name" legendType="line" label={ true } cx="50%" cy="50%" outerRadius={ 50 } fill="#8884d8">
                  { this.state.pieData.map((item) => <Cell key={ item.name } fill={ item.color } />) }
                </Pie>
              </PieChart>
            </div>
            );
    }
}

export default Profile;