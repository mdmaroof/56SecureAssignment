import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

class UserOnePage extends Component {

    render() {
        return (
            <div className="contentDemo">
                <h1>UserOnePage</h1>
            </div>
        )
    }
}
export default withRouter(UserOnePage);