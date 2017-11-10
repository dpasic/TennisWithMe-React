import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Net from '../../common/Net';

import PointsLeaderboard from '../points_leaderboard/PointsLeaderboard';
import WinsLeaderboard from '../wins_leaderboard/WinsLeaderboard';

class Leaderboards extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            topPointsPlayers: [],
            topWinsPlayers: []
        };
    }

    componentDidMount() {
        Net.get('api/Players/Points').then((topPointsPlayers) => {
            this.setState({
                topPointsPlayers: topPointsPlayers
            });
        });

        Net.get('api/Players/Wins').then((topWinsPlayers) => {
            this.setState({
                topWinsPlayers: topWinsPlayers
            });
        });
    }

    render() {
        return (
            <div className="leaderboards">
              <Grid fluid={ true }>
                <Row style={ { marginTop: 10 } }>
                  <Col sm={ 12 } md={ 6 }>
                  <h4 style={ { color: '#8D8D8D' } }>By Points</h4>
                  </Col>
                  <Col sm={ 12 } md={ 6 }>
                  <h4 style={ { color: '#8D8D8D' } }>By Wins</h4>
                  </Col>
                </Row>
                <Row style={ { marginTop: 10 } }>
                  <Col sm={ 12 } md={ 6 }>
                  <PointsLeaderboard players={ this.state.topPointsPlayers } />
                  </Col>
                  <Col sm={ 12 } md={ 6 }>
                  <WinsLeaderboard players={ this.state.topWinsPlayers } />
                  </Col>
                </Row>
              </Grid>
            </div>
            );
    }
}

export default Leaderboards;