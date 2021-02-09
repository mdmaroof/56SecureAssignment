import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, } from "react-router-dom";
import { LOGOUT } from './../redux/constant';
import setAuthorizationHeader from './setAuthorizationHeader';
import decode from 'jwt-decode';
import { isEmpty } from 'lodash';
import Header from './../routes/header';
import Sidebar from './../routes/sidebar';
import ForbiddenPage from '../routes/forbiddenPage';

class ProtectedRoute extends Component {
    state = {
        user: null
    }
    loggedIn = () => {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    getToken = () => localStorage.getItem('jwtToken');

    getProfile = () => {
        // return decode(localStorage.getItem('jwtToken'));
        return decode(this.getToken())
    }

    logOut = async () => {
        setAuthorizationHeader();
        this.props.logOut();
        this.props.history.replace('/');
    }

    isTokenExpired = (token) => {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    componentDidMount = async () => {
        if (!this.loggedIn()) {
            this.logOut();
            this.setState({ user: null })
            this.props.history.replace('/');
        }
        else {
            try {
                const token = this.getToken();
                const profile = await this.getProfile();
                this.setState({ user: profile })
                setAuthorizationHeader(token)

            }
            catch (err) {
                // this.logOut();
                // this.setState({ user: null })
                // this.props.history.replace('/');
            }
        }
    }

    render() {
        const { path, component, headerSidebar } = this.props;
        const CalledRoute = component;

        if (!isEmpty(this.state.user)) {
            return (
                headerSidebar ?
                    <>
                        <Header logout={() => this.logOut()} />
                        <div id="mainContent">
                            <Sidebar userDetail={this.state.user} />
                            <div className="content">
                                {(this.state.user.role === 'user' && (path === '/admin' || path === '/super_admin') || (this.state.user.role === 'admin' && path === '/super_admin'))
                                    ?
                                    <ForbiddenPage />
                                    :
                                    <Route path={path} render={() => <CalledRoute userDetail={this.state.user} logOut={this.logOut} />} />
                                }

                            </div>
                        </div>
                    </>
                    :
                    ''
            )
        }
        else {
            return null
        }
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch({ type: LOGOUT })
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps)
    (ProtectedRoute)
);