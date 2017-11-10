import React, { Component } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Paper from 'material-ui/Paper';

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
            player: {}
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            player: props.player
        });
    }

    render() {
        var player = this.state.player,
            favoritePlayer = null,
            points = null,
            wins = null;

        // favorite player badge
        if (player.IsFavoritePlayer) {
            favoritePlayer = favoritePlayerBadge;
        }

        // points badge
        if (player.HasPlatinumBadge) {
            points = platinumBadge;
        } else if (player.HasGoldBadge) {
            points = goldBadge;
        } else if (player.HasSilverBadge) {
            points = silverBadge;
        } else if (player.HasBronzeBadge) {
            points = bronzeBadge;
        }

        // wins badge
        if (player.HasWinnerMasterBadge) {
            wins = winnerMasterBadge;
        } else if (player.HasWinnerChallengerBadge) {
            wins = winnerChallengerBadge;
        } else if (player.HasWinnerRookieBadge) {
            wins = winnerRookieBadge;
        }

        // koristi 'react-tooltip'
        return (
            <div style={ { margin: 5 } } className="player_badges_card">
              <Paper style={ { height: 190 } }>
                <Row style={ { margin: 10 } }>
                  <Col md={ 12 }>
                  <h4 style={ { color: '#8D8D8D' } }>Badges</h4>
                  </Col>
                </Row>
                <Row>
                  <Col xs={ 4 }>
                  <img src={ favoritePlayer } alt="Favorite Player" className="img-responsive" style={ styles.badgeImg } />
                  </Col>
                  <Col xs={ 4 }>
                  <img src={ points } alt="Points" className="img-responsive" style={ styles.badgeImg } />
                  </Col>
                  <Col xs={ 4 }>
                  <img src={ wins } alt="Wins" className="img-responsive" style={ styles.badgeImg } />
                  </Col>
                </Row>
              </Paper>
            </div>
            );
    }
}

export default PlayerBadgesCard;