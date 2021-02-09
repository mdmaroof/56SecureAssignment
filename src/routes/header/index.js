import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

class Header extends Component {

    render() {
        return (
            <div className="header">
                <h2>56 Secure Assignment</h2>
                <h5 onClick={this.props.logout}>LogOut</h5>
            </div>
        )
    }
}
export default withRouter(Header);