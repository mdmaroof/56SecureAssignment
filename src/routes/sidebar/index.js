import React, { Component, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

class Sidebar extends Component {

    render() {
        return (
            <div className="sidebar">
                <div className="heading">Sidebar</div>

                <ul>
                    <li><NavLink activeClassName='is-active' to='dashboard'>Dashboard</NavLink></li>
                    <li><NavLink activeClassName='is-active' to='user1'> User Page One Dummy</NavLink></li>
                    <li><NavLink activeClassName='is-active' to='user2'> User Page Two Dummy</NavLink></li>
                    {this.props.userDetail.role !== "user" &&
                        <>
                            <li> <NavLink activeClassName='is-active' to='admin'> Admin Page Dummy</NavLink></li>
                            {this.props.userDetail.role !== "admin" && <li><NavLink activeClassName='is-active' to='super_admin'> SuperAdmin Dummy</NavLink></li>}
                        </>
                    }
                </ul>
            </div >
        )
    }
}


export default withRouter(Sidebar);