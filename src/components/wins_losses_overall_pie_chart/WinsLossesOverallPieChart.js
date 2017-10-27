import React, { Component } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

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
            <div className="wins_losses_overall_pie_chart">
              <ResponsiveContainer width="100%" height={ 200 }>
                <PieChart>
                  <Pie data={ this.state.pieData } dataKey="value" nameKey="name" legendType="line" label={ true } cx="50%" cy="50%" outerRadius={ 50 }>
                    { this.state.pieData.map((item) => <Cell key={ item.key } fill={ item.color } />) }
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            );
    }
}

export default WinsLossesOverallPieChart;