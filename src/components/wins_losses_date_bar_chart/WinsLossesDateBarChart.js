import React, { Component } from 'react';
import { Cell, Tooltip, Legend, BarChart, Bar, XAxis, ReferenceLine, ResponsiveContainer } from 'recharts';
import Paper from 'material-ui/Paper';

import Colors from '../../common/Colors';

const styles = {
    tooltipItem: {
        label: {
            color: '#8D8D8D'
        }
    }
};

class WinsLossesDateBarChart extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            barData: []
        };

        this.renderTooltip = this.renderTooltip.bind(this);
    }

    componentWillReceiveProps(props) {
        // take first 10 games (recent games)
        this.setState({
            barData: props.barData.slice(0, 10).reverse()
        });
    }

    renderTooltip(obj) {
        if (obj && obj.payload && obj.payload.length > 0) {
            var payload = obj.payload[0].payload;

            return (
                <div className="wins_losses_date_bar_chart_tooltip">
                  <Paper style={ { padding: 5 } }>
                    <p><span style={ styles.tooltipItem.label }>Opponent:</span> <span>{ payload.opponentName }</span></p>
                    <p><span style={ styles.tooltipItem.label }>Winner:</span> <span>{ payload.winnerName }</span></p>
                    <p><span style={ styles.tooltipItem.label }>Result:</span> <span>{ payload.result }</span></p>
                    <p><span style={ styles.tooltipItem.label }>Played:</span> <span>{ payload.fullTime }</span></p>
                    <p><span style={ styles.tooltipItem.label }>At:</span> <span>{ payload.city }</span></p>
                  </Paper>
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
                <ResponsiveContainer width="100%" height={ 180 }>
                  <BarChart data={ this.state.barData }>
                    <Bar dataKey="value" name="Wins/Losses by date (recent games)">
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