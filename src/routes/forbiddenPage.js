import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

class Forbidden extends Component {

    render() {
        return (
            <div className="forbiddenPage">
                <h1>User Not Authorized to use this Page</h1>
                <h2>Error 500</h2>
            </div>
        )
    }
}
export default withRouter(Forbidden);