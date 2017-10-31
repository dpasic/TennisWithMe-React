import React, { Component } from 'react';
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
        var player = this.state.player;

        return (
            <div style={ { margin: 5 } } className="player_info_card">
              <Card>
                <CardHeader title={ player.FullName } subtitle={ player.Email } avatar={ avatar } />
                <CardTitle title={ player.Skill } titleStyle={ { fontSize: 15 } } subtitle={ player.City } />
              </Card>
            </div>
            );
    }
}

export default PlayerInfoCard;