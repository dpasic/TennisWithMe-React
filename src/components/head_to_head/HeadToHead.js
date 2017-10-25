import React, { Component } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

import Net from '../../common/Net';
import Token from '../../common/Token';

class HeadToHead extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {};
    }

    componentDidMount() {}

    render() {
        return (
            <div className="headToHead">
              <h2>Head to Head</h2>
            </div>
            );
    }
}

export default HeadToHead;