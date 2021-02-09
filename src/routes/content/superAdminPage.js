import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

class SuperAdmin extends Component {

    render() {
        return (
            <div className="contentDemo">
                <h1>SuperAdmin</h1>
            </div>
        )
    }
}
export default withRouter(SuperAdmin);