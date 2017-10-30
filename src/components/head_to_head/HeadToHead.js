import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import moment from 'moment';

import Net from '../../common/Net';
import Colors from '../../common/Colors';

import WinsLossesOverallPieChart from '../wins_losses_overall_pie_chart/WinsLossesOverallPieChart';
import WinsLossesDateBarChart from '../wins_losses_date_bar_chart/WinsLossesDateBarChart';

class HeadToHead extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            profilePlayer: null,
            friends: [],
            selectedFriendId: null,
            pieData: [],
            barData: []
        };

        this.handlePlayerChange = this.handlePlayerChange.bind(this);
    }

    handlePlayerChange(event, index, value) {
        this.setState({
            selectedFriendId: value
        });

        var profilePlayer = this.state.profilePlayer;

        Net.get('api/Matches/Active?opponentId=' + value).then((matches) => {
            var barData = [],
                wins = 0,
                losses = 0;

            matches.forEach(function(match) {
                var barItem = {
                    key: match.Id,
                    date: moment(match.TimestampPlayed).format('DD/MM/YY'),
                    fullTime: moment(match.TimestampPlayed).format('DD/MM/YYYY HH:mm'),
                    opponentName: (match.ChallengerId === profilePlayer.Id) ? match.OpponentName : match.ChallengerName,
                    winnerName: match.WinnerName,
                    result: match.Result,
                    city: match.CityPlayed
                };

                if (profilePlayer.Id === match.WinnerId) {
                    barItem.value = 1;
                    barItem.color = Colors.green;
                    wins++;
                } else {
                    barItem.value = -1;
                    barItem.color = Colors.red;
                    losses++;
                }

                barData.push(barItem);
            });

            var pieData = [{
                key: 1,
                name: 'Wins',
                value: wins,
                color: Colors.green
            }, {
                key: 0,
                name: 'Losses',
                value: losses,
                color: Colors.red
            }];

            this.setState({
                pieData: pieData,
                barData: barData
            });
        });
    }

    componentDidMount() {
        Net.get('api/IdentityPlayer').then((player) => {
            this.setState({
                profilePlayer: player
            });
        });
        Net.get('api/PlayerFriendships/Active').then((friends) => {
            this.setState({
                friends: friends
            });
        });
    }

    render() {
        return (
            <div className="head_to_head">
              <SelectField floatingLabelText="Player" value={ this.state.selectedFriendId } onChange={ this.handlePlayerChange }>
                { this.state.friends.map((friend) => <MenuItem key={ friend.Id } value={ friend.Id } primaryText={ friend.FullName } />) }
              </SelectField>
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

export default HeadToHead;