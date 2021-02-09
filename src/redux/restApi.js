import { create } from 'apisauce';
import { browserName, browserVersion, osName, osVersion, mobileVendor, mobileModel } from 'react-device-detect';

// Intercept all api responses
const apiMonitor = (response) => {
    // if (localStorage.multiTenantLogin !== 'web' && response.status >= 400 && response.status !== 430) {
    //     webviewExitHandler(localStorage.multiTenantLogin, response.message || response.status);
    // }
    if ((response.status === 401 || response.status === 418) && response.config.url.indexOf('userPushToken') === -1) {
        store.dispatch({ type: COMMON_LOGOUT });
        if (response.status === 418) {
            store.dispatch({ type: INVALID_TIME_MODAL, payload: true });
            addToast(
                response.data && response.data.message
                    ? response.data.message
                    : 'system time is invalid!!, please change your system time',
                TOAST_TYPE.ERROR,
                5,
            );
        } else if (response.status === 401) {
            addToast('User not Authorized, Please login', TOAST_TYPE.ERROR, 5);
        } else if (store.getState().dashboard.invalidTimeModal) {
            store.dispatch({ type: INVALID_TIME_MODAL, payload: false });
        }

        Mixpanel.reset();
        return false;
    }

    if (response.status === 430) {
        if (localStorage.tokenData) {
            store.dispatch({ type: REFRESH_TOKEN.REQUEST });
        } else {
            store.dispatch({
                type: CREATE_TEMPORARY_ACCESS_TOKEN.REQUEST,
                payload: { json: localStorage.temporaryTokenPayload },
            });
        }
    }
    // no credit
    if (response.status === 402) {
        store.dispatch({ type: NO_CREDIT_MODAL, payload: true });
        return false;
    }

    return true;
};

export const usersApi = create({
    baseURL: process.env.API_USER_URL,
    headers: { 'x-tenant': 'userDetails' },
});

export const communityType = create({
    baseURL: process.env.API_COMMUNITY_TYPE,
    headers: { 'x-tenant': 'userDetails' },
});
usersApi.addMonitor(apiMonitor);
// realtimeApi.addRequestTransform(requestTransform);