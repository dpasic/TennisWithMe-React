import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class Leaderboards extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            player: {}
        };
    }

    componentDidMount() {}

    render() {
        return (
            <div className="leaderboards">
              <Grid fluid={ true }>
                <Row style={ { marginTop: 10 } }>
                  <Col>
                  <h3>Leaderboards</h3>
                  </Col>
                </Row>
              </Grid>
            </div>
            );
    }
}

export default Leaderboards;