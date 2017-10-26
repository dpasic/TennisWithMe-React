import React, { Component } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ReferenceLine } from 'recharts';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import moment from 'moment';

import Net from '../../common/Net';
import Token from '../../common/Token';
import Colors from '../../common/Colors';

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var shortYear = a.getFullYear() % 100;
    var monthCaption = months[a.getMonth()];
    var month = a.getMonth() + 1;
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + '/' + month + '/' + shortYear;
    return time;
}

class Profile extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            pieData: [],
            barData: []
        };
    }

    componentDidMount() {
        Net.get('api/IdentityPlayer').then((player) => {
            var pieData = [{
                key: 1,
                name: 'Wins',
                value: player.WonGames,
                color: Colors.green
            }, {
                key: 0,
                name: 'Loses',
                value: player.LostGames,
                color: Colors.red
            }];

            this.setState({
                pieData: pieData
            });

            Net.get('api/Matches/Active').then((matches) => {
                var barData = [];
                matches.forEach(function(match) {
                    if (player.Id === match.WinnerId) {
                        barData.push({
                            key: match.Id,
                            date: moment.unix(match.TimestampPlayed / 1000).format("DD/MM/YY"),
                            value: 1,
                            color: Colors.green
                        });
                    } else {
                        barData.push({
                            key: match.Id,
                            date: moment.unix(match.TimestampPlayed / 1000).format("DD/MM/YY"),
                            value: -1,
                            color: Colors.red
                        });
                    }
                });

                this.setState({
                    barData: barData
                });
            });
        });
    }

    render() {
        return (
            <div className="profile">
              <Grid>
                <Row>
                  <Col sm={ 12 } md={ 6 }>
                  { /* Wins/Loses chart */ }
                  <PieChart width={ 200 } height={ 200 }>
                    <Pie data={ this.state.pieData } dataKey="value" nameKey="name" legendType="line" label={ true } cx="50%" cy="50%" outerRadius={ 50 }>
                      { this.state.pieData.map((item) => <Cell key={ item.key } fill={ item.color } />) }
                    </Pie>
                    <Legend />
                  </PieChart>
                  </Col>
                  <Col sm={ 12 } md={ 6 }>
                  { /* Wins/Loses chart */ }
                  <BarChart width={ 200 } height={ 200 } data={ this.state.barData }>
                    <Bar dataKey="value">
                      { this.state.barData.map((item) => <Cell key={ item.key } fill={ item.color } />) }
                    </Bar>
                    <Legend />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid />
                    <ReferenceLine y={ 0 } stroke={ Colors.black } />
                  </BarChart>
                  </Col>
                </Row>
              </Grid>
            </div>
            );
    }
}

export default Profile;