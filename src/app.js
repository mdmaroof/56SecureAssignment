import React, { Fragment } from 'react';
import "./style.scss";
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

// const history = createBrowserHistory();
// history.listen(historyListener);

const App = () => (
    <Provider store={store}>
        <Router>
            <Routes />
        </Router>
    </Provider >
)

export default App;