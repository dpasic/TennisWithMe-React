import React, { Component } from 'react';
import { Cell, Tooltip, Legend, BarChart, Bar, XAxis, ReferenceLine, ResponsiveContainer } from 'recharts';
import Paper from 'material-ui/Paper';

import Colors from '../../common/Colors';

class WinsLossesDateBarChart extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            barData: []
        };

        this.renderTooltip = this.renderTooltip.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            barData: props.barData
        });
    }

    renderTooltip(obj) {
        if (obj && obj.payload && obj.payload.length > 0) {
            var payload = obj.payload[0].payload;

            return (
                <div className="wins_losses_date_bar_chart_tooltip">
                  <p>Opponent: <span>{ payload.opponentName }</span></p>
                  <p>Winner: <span>{ payload.winnerName }</span></p>
                  <p>Result: <span>{ payload.result }</span></p>
                  <p>Played: <span>{ payload.fullTime }</span></p>
                  <p>At: <span>{ payload.city }</span></p>
                </div>
                );
        }
    }

    render() {
        var legend = null;
        if (this.state.barData.length > 0) {
            legend = <Legend />;
        }

        return (
            <div style={ { margin: 5 } } className="wins_losses_date_bar_chart">
              <Paper>
                <ResponsiveContainer width="100%" height={ 200 }>
                  <BarChart data={ this.state.barData }>
                    <Bar dataKey="value" name="Wins/Losses by date">
                      { this.state.barData.map((item, index) => <Cell key={ index } fill={ item.color } />) }
                    </Bar>
                    { legend }
                    <XAxis dataKey="date" />
                    <Tooltip content={ this.renderTooltip } />
                    <ReferenceLine y={ 0 } stroke={ Colors.black } />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </div>
            );
    }
}

export default WinsLossesDateBarChart;