import React, { Component } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Card, CardHeader, CardTitle } from 'material-ui/Card';

import avatar from '../../assets/tennis-player.png';

class PlayerInfoCard extends Component {

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
            pointsSubtitle = `${player.Points} points`;

        return (
            <div style={ { margin: 5 } } className="player_info_card">
              <Row style={ { marginTop: 10, marginBottom: 10 } }>
                <Col md={ 12 }>
                <Card style={ { height: 224 } }>
                  <CardHeader title={ player.FullName } subtitle={ pointsSubtitle } avatar={ avatar } />
                  <CardTitle title={ player.SkillDescription } titleStyle={ { fontSize: 15 } } subtitle={ player.City } />
                </Card>
                </Col>
              </Row>
            </div>
            );
    }
}

export default PlayerInfoCard;