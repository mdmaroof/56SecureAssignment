import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import Login from './login';
import Dashboard from './dashboard';
import UserOnePage from './content/user1';
import UserTwoPage from './content/user2';
import AdminPage from './content/admin';
import SuperAdmin from './content/superAdminPage';
import ProtectedRoute from '../helpers/protectedRoutes';

// import LandingPage from './landingPage';

const fourOfour = () => <h1>404</h1>;
const New = () => <h1>new</h1>;

class Routes extends Component {
    render() {
        return (
            // <LandingPage />
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/new" component={New} />

                <ProtectedRoute exact path="/dashboard" headerSidebar component={Dashboard} />
                <ProtectedRoute exact path="/user1" headerSidebar component={UserOnePage} />
                <ProtectedRoute exact path="/user2" headerSidebar component={UserTwoPage} />
                <ProtectedRoute exact path="/admin" headerSidebar component={AdminPage} />
                <ProtectedRoute exact path="/super_admin" headerSidebar component={SuperAdmin} />

                {/* <ProtectedRoute exact path="/addProfile" component={AddProfile} /> */}
                {/* <ProtectedRoute exact path="/user" component={Users} />
                <ProtectedRoute exact path="/createCommunity" component={AddCommunity} /> */}


                <Route path="*" component={fourOfour} />
            </Switch>
        )
    }
}

export default withRouter(Routes);