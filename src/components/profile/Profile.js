import React, { Component } from 'react';
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

class Profile extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            player: {},
            pieData: [],
            matches: []
        };
    }

    componentDidMount() {
        Net.get('api/IdentityPlayer').then((player) => {
            var pieData = [{
                name: 'Wins',
                value: player.WonGames,
                color: Colors.green
            }, {
                name: 'Losses',
                value: player.LostGames,
                color: Colors.red
            }];

            this.setState({
                player: player,
                pieData: pieData
            });

            Net.get('api/Matches/Active').then((activeMatches) => {
                var matches = [];
                activeMatches.forEach(function(match) {
                    var matchItem = {
                        date: moment(match.TimestampPlayed).format('DD/MM/YY'),
                        fullTime: moment(match.TimestampPlayed).format('DD.MM.YYYY. HH:mm'),
                        opponentName: (match.ChallengerId === player.Id) ? match.OpponentName : match.ChallengerName,
                        winnerName: match.WinnerName,
                        result: match.Result,
                        city: match.CityPlayed,
                        comment: match.Comment
                    };

                    if (player.Id === match.WinnerId) {
                        matchItem.value = 1;
                        matchItem.resultDescription = 'Won';
                        matchItem.color = Colors.green;
                    } else {
                        matchItem.value = -1;
                        matchItem.resultDescription = 'Lost';
                        matchItem.color = Colors.red;
                    }

                    matches.push(matchItem);
                });

                this.setState({
                    matches: matches
                });
            });
        });
    }

    render() {
        return (
            <div className="profile">
              <Grid>
                <Row>
                  <Col sm={ 12 } md={ 3 } mdPull={ 4 }>
                  <PlayerInfoCard player={ this.state.player } />
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

export default Profile;