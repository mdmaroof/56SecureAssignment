import axios from 'axios';
import store from '../store';

export default (token = null) => {
  if (token) {
    localStorage.jwtToken = token;
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    return true;
  }
  delete axios.defaults.headers.common.Authorization;
  localStorage.removeItem('jwtToken');
  // localStorage.removeItem('selectedProduct');
  // localStorage.removeItem('sectionData');
  // localStorage.removeItem('curriculum');
  // store.dispatch({ type: USER_TOKEN, payload: null });
  // store.dispatch({ type: CLEAR_USER_SPECIFIC_ELASTIC_DATA });
  // store.dispatch({ type: CLEAR_USER_SPECIFIC_FOLDER_DATA });
  // store.dispatch({ type: CLEAR_USER_SPECIFIC_DATA });
  // localStorage.removeItem('loggedUser');
  // store.dispatch({ type: SELECTED_PRODUCT, payload: {} });
  return true;
};
