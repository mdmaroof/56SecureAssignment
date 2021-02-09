import { combineReducers } from 'redux-immutable';
import user from './users';
import { LOGOUT } from '../constant';
const appReducer = combineReducers({
    user,
})

// reset the state of a redux store
const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        state = undefined;
    }
    return appReducer(state, action)
}

export default rootReducer;