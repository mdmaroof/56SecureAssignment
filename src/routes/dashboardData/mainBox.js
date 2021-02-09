import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

class MainBox extends Component {

    render() {
        const totalData = this.props.userData.filter(x => x.role === this.props.data);
        return (
            <div key={this.props.data} className="boxDashboard">
                Total {this.props.data}s
                <span>
                    {totalData.length}
                </span>
                <hr />
                <h3 onClick={() => this.props.selectRole(totalData)}>View</h3>
            </div>
        )
    }
}
export default withRouter(MainBox);