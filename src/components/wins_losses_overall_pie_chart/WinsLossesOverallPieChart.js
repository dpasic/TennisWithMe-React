import React, { Component } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { PieChart, Tooltip, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import Paper from 'material-ui/Paper';

class WinsLossesOverallPieChart extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            pieData: [],
            header: null
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            pieData: props.pieData,
            header: props.header
        });
    }

    render() {
        return (
            <div style={ { margin: 5 } } className="wins_losses_overall_pie_chart">
              <Paper>
                <Row style={ { margin: 10 } }>
                  <Col md={ 12 }>
                  <h4 style={ { color: '#8D8D8D' } }>{ this.state.header }</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md={ 12 }>
                  <ResponsiveContainer width="100%" height={ 180 }>
                    <PieChart>
                      <Pie data={ this.state.pieData } dataKey="value" nameKey="name" legendType="line" label={ true } cx="50%" cy="50%" outerRadius={ 50 }>
                        { this.state.pieData.map((item, index) => <Cell key={ index } fill={ item.color } />) }
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  </Col>
                </Row>
              </Paper>
            </div>
            );
    }
}

export default WinsLossesOverallPieChart;