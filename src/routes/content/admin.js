import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

class AdminPage extends Component {

    render() {
        return (
            <div className="contentDemo">
                <h1>AdminPage</h1>
            </div>
        )
    }
}
export default withRouter(AdminPage);