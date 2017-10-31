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
        //TODO: dodaj provjeru jel postoji PlayerInfoCard
        return (
            <div className="head_to_head">
              <SelectField floatingLabelText="Player" value={ this.state.selectedFriendId } onChange={ this.handlePlayerChange }>
                { this.state.friends.map((friend, index) => <MenuItem key={ index } value={ friend.Id } primaryText={ friend.FullName } />) }
              </SelectField>
              <Grid>
                <Row>
                  <Col sm={ 12 } md={ 3 } mdPull={ 4 }>
                  <PlayerInfoCard player={ this.state.selectedFriend } />
                  </Col>
                  <Col sm={ 12 } md={ 9 } mdPull={ 6 }>
                  <WinsLossesOverallPieChart pieData={ this.state.pieData } />
                  </Col>
                </Row>
              </Grid>
              <WinsLossesDateBarChart barData={ this.state.matches } />
              { this.state.matches.map((match, index) => <MatchCard key={ index } match={ match } />) }
            </div>
            );
    }
}

export default HeadToHead;