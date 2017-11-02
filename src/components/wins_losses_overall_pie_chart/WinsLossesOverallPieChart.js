import React, { Component } from 'react';
import { PieChart, Tooltip, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import Paper from 'material-ui/Paper';

class WinsLossesOverallPieChart extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            pieData: []
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            pieData: props.pieData
        });
    }

    render() {
        return (
            <div style={ { margin: 5 } } className="wins_losses_overall_pie_chart">
              <Paper>
                <ResponsiveContainer width="100%" height={ 190 }>
                  <PieChart>
                    <Pie data={ this.state.pieData } dataKey="value" nameKey="name" legendType="line" label={ true } cx="50%" cy="50%" outerRadius={ 50 }>
                      { this.state.pieData.map((item, index) => <Cell key={ index } fill={ item.color } />) }
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </div>
            );
    }
}

export default WinsLossesOverallPieChart;