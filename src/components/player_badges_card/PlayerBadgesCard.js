import React, { Component } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Paper from 'material-ui/Paper';
import ReactTooltip from 'react-tooltip'

import favoritePlayerBadge from '../../assets/favorite-player-badge.png';

import bronzeBadge from '../../assets/bronze-badge.png';
import silverBadge from '../../assets/silver-badge.png';
import goldBadge from '../../assets/gold-badge.png';
import platinumBadge from '../../assets/platinum-badge.png';

import winnerRookieBadge from '../../assets/winner-rookie-badge.png';
import winnerChallengerBadge from '../../assets/winner-challenger-badge.png';
import winnerMasterBadge from '../../assets/winner-master-badge.png';

const styles = {
    badgeImg: {
        marginTop: '10px',
        marginLeft: '10px'
    }
};

class PlayerBadgesCard extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            player: {},
            header: null
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            player: props.player,
            header: props.header
        });
    }

    render() {
        var player = this.state.player,
            favoritePlayer = null,
            points = null,
            pointsTooltip = 'Points Badge',
            wins = null,
            winsTooltip = 'Wins Badge';

        // favorite player badge
        if (player.IsFavoritePlayer) {
            favoritePlayer = favoritePlayerBadge;
        }

        // points badge
        if (player.HasPlatinumBadge) {
            points = platinumBadge;
            pointsTooltip = 'Points (Platinum Badge)';
        } else if (player.HasGoldBadge) {
            points = goldBadge;
            pointsTooltip = 'Points (Gold Badge)';
        } else if (player.HasSilverBadge) {
            points = silverBadge;
            pointsTooltip = 'Points (Silver Badge)';
        } else if (player.HasBronzeBadge) {
            points = bronzeBadge;
            pointsTooltip = 'Points (Bronze Badge)';
        }

        // wins badge
        if (player.HasWinnerMasterBadge) {
            wins = winnerMasterBadge;
            winsTooltip = 'Wins (Master Badge)';
        } else if (player.HasWinnerChallengerBadge) {
            wins = winnerChallengerBadge;
            winsTooltip = 'Wins (Challenger Badge)';
        } else if (player.HasWinnerRookieBadge) {
            wins = winnerRookieBadge;
            winsTooltip = 'Wins (Rookie Badge)';
        }

        return (
            <div style={ { margin: 5 } } className="player_badges_card">
              <Paper>
                <Row style={ { margin: 10 } }>
                  <Col md={ 12 }>
                  <h4 style={ { color: '#8D8D8D' } }>{ this.state.header }</h4>
                  </Col>
                </Row>
                <Row style={ { height: 180 } }>
                  <Col xs={ 4 }>
                  <img src={ favoritePlayer } data-tip data-for="favoritePlayerTooltip" alt="Favorite Player Badge" className="img-responsive" style={ styles.badgeImg } />
                  </Col>
                  <ReactTooltip id='favoritePlayerTooltip' place='bottom' type='light' effect='solid'>Favorite Player Badge</ReactTooltip>
                  <Col xs={ 4 }>
                  <img src={ points } data-tip data-for="pointsTooltip" alt="Points Badge" className="img-responsive" style={ styles.badgeImg } />
                  </Col>
                  <ReactTooltip id='pointsTooltip' place='bottom' type='light' effect='solid'>
                    { pointsTooltip }
                  </ReactTooltip>
                  <Col xs={ 4 }>
                  <img src={ wins } data-tip data-for="winsTooltip" alt="Wins Badge" className="img-responsive" style={ styles.badgeImg } />
                  </Col>
                  <ReactTooltip id='winsTooltip' place='bottom' type='light' effect='solid'>
                    { winsTooltip }
                  </ReactTooltip>
                </Row>
              </Paper>
            </div>
            );
    }
}

export default PlayerBadgesCard;