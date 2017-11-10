import React, { Component } from 'react';
import { Card, CardHeader, CardTitle } from 'material-ui/Card';

import avatar from '../../assets/tennis-player.png';

class WinsLeaderboard extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            players: []
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            players: props.players
        });
    }

    render() {
        return (
            <div style={ { margin: 5 } } className="wins_leaderboard">
              { this.state.players.map((player) => {
                    var winsSubtitle = `${player.WonGames} wins`;
                    return <Card key={ player.Id } style={ { margin: 5 } }>
                             <CardHeader title={ player.FullName } subtitle={ winsSubtitle } avatar={ avatar } actAsExpander={ true } showExpandableButton={ true }
                             />
                             <CardTitle title={ player.SkillDescription } titleStyle={ { fontSize: 15 } } subtitle={ player.City } expandable={ true } />
                           </Card>;
                }) }
            </div>
            );
    }
}

export default WinsLeaderboard;