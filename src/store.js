import { fromJS } from 'immutable';
import configureStore from './redux/store';
const initialState = fromJS({});
const store = configureStore(initialState);
export default store;