/* eslint no-magic-numbers: 0 */
import React, {Component} from 'react';

import { SpillthebeansThreejs } from '../lib';

class App extends Component {

    constructor() {
        super();
        this.state = {
            id: "test_id",
            numBeans: 2
        };
        this.setProps = this.setProps.bind(this);
    }

    setProps(newProps) {
        this.setState(newProps);
    }

    render() {
        return (
            <div>
                <SpillthebeansThreejs
                    setProps={this.setProps}
                    {...this.state}
                />
            </div>
        )
    }
}

export default App;
