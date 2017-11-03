import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import moment from 'moment';

import Net from '../../common/Net';
import Colors from '../../common/Colors';

import PlayerInfoCard from '../player_info_card/PlayerInfoCard';
import WinsLossesOverallPieChart from '../wins_losses_overall_pie_chart/WinsLossesOverallPieChart';
import WinsLossesDateBarChart from '../wins_losses_date_bar_chart/WinsLossesDateBarChart';
import MatchCard from '../match_card/MatchCard';

class HeadToHead extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            profilePlayer: {},
            friends: [],
            selectedFriendId: null,
            selectedFriend: {},
            pieData: [],
            matches: []
        };

        this.handlePlayerChange = this.handlePlayerChange.bind(this);
    }

    handlePlayerChange(event, index, value) {
        this.setState({
            selectedFriendId: value,
            selectedFriend: this.state.friends[index]
        });

        var profilePlayer = this.state.profilePlayer;

        Net.get('api/Matches/Active?opponentId=' + value).then((activeMatches) => {
            var matches = [],
                wins = 0,
                losses = 0;

            activeMatches.forEach(function(match) {
                var matchItem = {
                    date: moment(match.TimestampPlayed).format('DD/MM/YY'),
                    fullTime: moment(match.TimestampPlayed).format('DD.MM.YYYY. HH:mm'),
                    opponentName: (match.ChallengerId === profilePlayer.Id) ? match.OpponentName : match.ChallengerName,
                    winnerName: match.WinnerName,
                    result: match.Result,
                    city: match.CityPlayed,
                    comment: match.Comment
                };

                if (profilePlayer.Id === match.WinnerId) {
                    matchItem.value = 1;
                    matchItem.resultDescription = 'Won';
                    matchItem.color = Colors.green;
                    wins++;
                } else {
                    matchItem.value = -1;
                    matchItem.resultDescription = 'Lost';
                    matchItem.color = Colors.red;
                    losses++;
                }

                matches.push(matchItem);
            });

            var pieData = [{
                name: 'Wins',
                value: wins,
                color: Colors.green
            }, {
                name: 'Losses',
                value: losses,
                color: Colors.red
            }];

            this.setState({
                pieData: pieData,
                matches: matches
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
        var playerInfoCard = null,
            winsLossesOverallPieChart = null,
            winsLossesDateBarChart = null,
            matchesCaption = null;

        if (this.state.selectedFriendId != null) {
            playerInfoCard = <PlayerInfoCard player={ this.state.selectedFriend } />;
            winsLossesOverallPieChart = <WinsLossesOverallPieChart pieData={ this.state.pieData } />;
            winsLossesDateBarChart = <WinsLossesDateBarChart barData={ this.state.matches } />;
            matchesCaption = <h4 style={ { color: '#8D8D8D' } }>Matches</h4>;
        }

        return (
            <div className="head_to_head">
              <Grid fluid={ true }>
                <Row style={ { marginTop: 10 } }>
                  <Col md={ 12 }>
                  <SelectField floatingLabelText="Player" value={ this.state.selectedFriendId } onChange={ this.handlePlayerChange }>
                    { this.state.friends.map((friend, index) => <MenuItem key={ index } value={ friend.Id } primaryText={ friend.FullName } />) }
                  </SelectField>
                  </Col>
                </Row>
                <Row style={ { marginTop: 10 } }>
                  <Col sm={ 12 } md={ 3 }>
                  { playerInfoCard }
                  </Col>
                  <Col sm={ 12 } md={ 3 }>
                  { winsLossesOverallPieChart }
                  </Col>
                </Row>
                <Row style={ { marginTop: 10 } }>
                  <Col md={ 12 }>
                  { winsLossesDateBarChart }
                  </Col>
                </Row>
                <Row style={ { marginTop: 50 } }>
                  <Col md={ 12 }>
                  { matchesCaption }
                  </Col>
                </Row>
                <Row>
                  <Col sm={ 12 } md={ 6 }>
                  { this.state.matches.filter((match, index) => index % 2 === 0).map((match, index) => <MatchCard key={ index } match={ match } />) }
                  </Col>
                  <Col sm={ 12 } md={ 6 }>
                  { this.state.matches.filter((match, index) => index % 2 === 1).map((match, index) => <MatchCard key={ index } match={ match } />) }
                  </Col>
                </Row>
              </Grid>
            </div>
            );
    }
}

export default HeadToHead;