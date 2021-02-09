import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { CALL_TOKEN, REGISTER_NEW_USER } from './../redux/constant';
import setAuthorizationHeader from '../helpers/setAuthorizationHeader';
import jwt from 'jsonwebtoken';

class Login extends Component {
    state = {
        email: '',
        password: '',
    }
    changeValue = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    changePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    componentDidMount() {
        if (localStorage.getItem('jwtToken')) {
            setAuthorizationHeader(localStorage.getItem('jwtToken'))
            this.props.history.push(`/dashboard`);
        }
    }
    componentDidUpdate({ login }) {
        if (login !== this.props.login && localStorage.getItem('jwtToken')) {
            setAuthorizationHeader(localStorage.getItem('jwtToken'))
            this.props.history.push(`/dashboard`);
        }
    }
    sendData = async () => {
        const data = { email: this.state.email, password: this.state.password }
        // await this.props.sendData(data)
        const find = this.props.users.find(x => x.email === data.email && x.password === data.password)

        const token = await jwt.sign(JSON.parse(JSON.stringify(find)), "SECRET_KEY", {
            expiresIn: '7d'
        });

        this.props.sendData(token)
    }

    render() {
        const { email, password } = this.state;
        return (
            <div className="loginPage">
                <div className="box">
                    <h1>56 Secure Assignment</h1>
                    <div className="formLogin">
                        <input value={email} onChange={this.changeValue} type="email" placeholder="Email" />
                        <input value={password} onChange={this.changePassword} type="password" placeholder="Password" />
                        <input type="button" onClick={this.sendData} value="Login" />
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    users: state.toJS().user.users,
    login: state.toJS().user.login,
})

const mapDispatchToProps = dispatch => ({
    sendData: (data) => dispatch({ type: CALL_TOKEN.SUCCESS, payload: data }),
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps)
    (Login)
);