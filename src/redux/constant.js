function generateConstants(service, base, loading) {
    if (loading) {
        return {
            REQUEST: `${service}/${base}_REQUEST`,
            SUCCESS: `${service}/${base}_SUCCESS`,
            FAILURE: `${service}/${base}_FAILURE`,
            LOADING: `${service}/${base}_LOADING`,
        };
    }
    return {
        REQUEST: `${service}/${base}_REQUEST`,
        SUCCESS: `${service}/${base}_SUCCESS`,
        FAILURE: `${service}/${base}_FAILURE`,
    };
}

export const CALL_TOKEN = generateConstants('token', 'CALL_TOKEN',);
export const LOGOUT = generateConstants('user', 'LOGOUT',);
export const SEND_DATA = generateConstants('data', 'SEND_DATA',);
export const SEND_TOAST = generateConstants('data', 'SEND_TOAST',);
export const DELETE_DATA = generateConstants('data', 'DELETE_DATA',);






