import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import MainBox from './dashboardData/mainBox';
import Maps from './dashboardData/maps';
import { SEND_DATA, SEND_TOAST, DELETE_DATA } from '../redux/constant';



class Dashboard extends Component {

    state = {
        selectedRole: null,
        closed: true,
        addUser: false,
        name: '',
        email: '',
        password: '',
        role: ''
    }
    componentDidUpdate = () => {
    }

    closedView = () => {
        this.setState({ closed: true })
        setTimeout(() => {
            this.setState({ selectedRole: null })
        }, 990)
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    SubmitData = async () => {
        if (this.state.email === '' ||
            this.state.name === '' ||
            this.state.password === '' ||
            this.state.role === '') {
            console.log('please fill all the files')
        }
        else {
            const payload = {
                email: this.state.email,
                name: this.state.name,
                password: this.state.password,
                role: this.state.role
            }
            await this.props.sendData(payload);
            await this.setState({ email: '', name: '', password: '', role: '' });
            await this.props.sendToast('User Added Succefully');
            setTimeout(() => {
                this.props.sendToast(null);
            }, 5000)
            this.setState({ addUser: false })
        }

    }

    deleteData = async (data) => {
        await this.props.deleteData(data)
        await this.props.sendToast('User Deleted Succefully');
        setTimeout(() => {
            this.props.sendToast(null);
        }, 5000);
        this.setState({ closed: true })
        setTimeout(() => {
            this.setState({ selectedRole: null })
        }, 990)
    }
    render() {
        let roleArray = [];

        if (this.props.userDetail.role === 'user') {
            roleArray = ["user"]
        }
        else if (this.props.userDetail.role === 'admin') {
            roleArray = ["user", "admin"]
        }
        else {
            this.props.users.map((x, i) => {
                if (!roleArray.includes(x.role)) {
                    roleArray.push(x.role)
                }
            });
        }
        return (
            <>
                {this.props.toast !== null &&
                    <div className="toast">{this.props.toast} </div>
                }

                {this.state.selectedRole ?
                    <div className={`dataView ${this.state.closed ? 'closedView' : 'openView'}`}>
                        <h1 className="closeButton" onClick={() => this.closedView()}>X</h1>

                        <h2>All {this.state.selectedRole[0].role}</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    {(this.props.userDetail.role !== 'user' && this.state.selectedRole[0].role !== this.props.userDetail.role) &&
                                        <th>Delete</th>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.selectedRole.map(x => {
                                    return (
                                        <tr key={x.email}>
                                            <td>{x.name}</td>
                                            <td>{x.email}</td>
                                            {(this.props.userDetail.role !== 'user' && this.state.selectedRole[0].role !== this.props.userDetail.role) &&
                                                <td><span onClick={() => this.deleteData(x.email)}>Delete</span></td>
                                            }
                                        </tr>

                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    :
                    ''
                }
                {
                    // 
                    this.state.addUser ?
                        <div className="addUser">
                            <div className="modelBox">
                                <div className="heading">Add User</div>
                                <hr />

                                <div className="form">
                                    <input value={this.state.name} onChange={this.myChangeHandler} type="text" name='name' placeholder="Please Type Your Name" />
                                    <input value={this.state.email} onChange={this.myChangeHandler} type="email" name='email' placeholder="Please Type Your Email" />
                                    <input value={this.state.password} onChange={this.myChangeHandler} type="text" name='password' placeholder="Please Type Your Password" />
                                    <select value={this.state.role} name='role' onChange={this.myChangeHandler}>
                                        <option value=''>Please Select User Role</option>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <button onClick={() => this.SubmitData()}>
                                        Add User
                                    </button>
                                    <button className="close"
                                        onClick={() => this.setState({ addUser: false })}>
                                        Close Modal
                                    </button>
                                </div>
                            </div>
                        </div>
                        :
                        ''
                }
                <div className="contentDashboard">
                    <div className="headingtop">
                        <h1>Welcome To 56 Secure Dashboard <span>{this.props.userDetail.name}</span></h1>
                        {this.props.userDetail.role !== 'user' &&
                            <div className="flex2">
                                <div onClick={() => this.setState({ addUser: true })} className="buttonAdd">Add User</div>
                            </div>
                        }
                    </div>
                    <div className="boxOutline">
                        {roleArray.map(x => {
                            return (
                                <MainBox selectRole={(data) => this.setState({ closed: false, selectedRole: data })} key={x} userData={this.props.users} data={x} />
                            )
                        })}
                    </div>

                    <hr />
                    {this.props.userDetail.role !== "user" &&
                        <>
                            <h1>Maps</h1>
                            <Maps />
                        </>
                    }
                </div>

            </>
        )
    }
}

const mapStateToProps = state => ({
    users: state.toJS().user.users,
    toast: state.toJS().user.toastMsg,
})

const mapDispatchToProps = dispatch => ({
    sendData: (data) => dispatch({ type: SEND_DATA.SUCCESS, payload: data }),
    deleteData: (data) => dispatch({ type: DELETE_DATA.SUCCESS, payload: data }),
    sendToast: (data) => dispatch({ type: SEND_TOAST.SUCCESS, payload: data })
})

export default withRouter(connect(
    mapStateToProps, mapDispatchToProps)
    (Dashboard)
);