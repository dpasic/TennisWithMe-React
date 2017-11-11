import React, { Component } from 'react';
import { Card, CardHeader, CardTitle } from 'material-ui/Card';

import avatar from '../../assets/tennis-player.png';

class MatchCard extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            match: props.match
        };
    }

    render() {
        var match = this.state.match,
            cardTitle = `vs. ${match.opponentName} (${match.resultDescription})`;

        return (
            <div style={ { margin: 5 } } className="match_card">
              <Card expanded={ this.state.isExpanded }>
                <CardHeader title={ cardTitle } subtitle={ match.fullTime } avatar={ avatar } actAsExpander={ true } showExpandableButton={ true }
                />
                <CardTitle title={ match.result } titleStyle={ { fontSize: 16 } } subtitle={ match.city } expandable={ true } />
              </Card>
            </div>
            );
    }
}

export default MatchCard;