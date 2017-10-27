import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import moment from 'moment';

import Net from '../../common/Net';
import Colors from '../../common/Colors';

import WinsLossesOverallPieChart from '../wins_losses_overall_pie_chart/WinsLossesOverallPieChart';
import WinsLossesDateBarChart from '../wins_losses_date_bar_chart/WinsLossesDateBarChart';

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
                name: 'Losses',
                value: player.LostGames,
                color: Colors.red
            }];

            this.setState({
                pieData: pieData
            });

            Net.get('api/Matches/Active').then((matches) => {
                var barData = [];
                matches.forEach(function(match) {
                    var barItem = {
                        key: match.Id,
                        date: moment(match.TimestampPlayed).format('DD/MM/YY'),
                        fullTime: moment(match.TimestampPlayed).format('DD/MM/YYYY HH:mm'),
                        opponentName: (match.ChallengerId === player.Id) ? match.OpponentName : match.ChallengerName,
                        winnerName: match.WinnerName,
                        result: match.Result,
                        city: match.CityPlayed
                    };

                    if (player.Id === match.WinnerId) {
                        barItem.value = 1;
                        barItem.color = Colors.green;
                    } else {
                        barItem.value = -1;
                        barItem.color = Colors.red;
                    }

                    barData.push(barItem);
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
                  <Col sm={ 12 } md={ 3 }>
                  <WinsLossesOverallPieChart pieData={ this.state.pieData } />
                  </Col>
                  <Col sm={ 12 } md={ 9 }>
                  <WinsLossesDateBarChart barData={ this.state.barData } />
                  </Col>
                </Row>
              </Grid>
            </div>
            );
    }
}

export default Profile;