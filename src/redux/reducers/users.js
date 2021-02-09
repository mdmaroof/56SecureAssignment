import { CALL_TOKEN, SEND_DATA, SEND_TOAST, DELETE_DATA } from '../constant';

const initialState = {
    // userToken: '',
    login: false,
    userToken: '',
    users: [
        {
            email: 'user1@gmail.com',
            name: 'User1',
            password: '12345',
            role: 'user'
        },
        {
            email: 'user2@gmail.com',
            name: 'User2',
            password: '12345',
            role: 'user'
        },
        {
            email: 'admin@gmail.com',
            name: 'admin',
            password: '12345',
            role: 'admin'
        },
        {
            email: 'superadmin@gmail.com',
            name: 'superadmin',
            password: '12345',
            role: 'superadmin'
        }
    ],

    geoPosition: [
        { id: 1, name: 'Raj Bhavan', lat: 26.841471897570063, long: 80.94638374143707 },
        { id: 2, name: 'Vidhan Sabha', lat: 26.844020629140353, long: 80.94410694602584 },
        { id: 3, name: 'Lucknow Museum', lat: 26.845735189667312, long: 80.95496555681054 },
        { id: 4, name: 'Shubham Cinema', lat: 26.84839827596327, long: 80.93346077726298 },
        { id: 5, name: 'Balrampur Hospital', lat: 26.857371213673044, long: 80.92671482364567 },
        { id: 6, name: 'Model House Park', lat: 26.844750719195133, long: 80.93068077884182 },
        { id: 7, name: 'Passport Seva Kendra', lat: 26.839096898445213, long: 80.93456432930034 },
        { id: 8, name: 'Sikandar Bagh', lat: 26.856130652409387, long: 80.95234894732896 },
        { id: 9, name: 'Fatima Hospital', lat: 26.872201577845637, long: 80.95207077021227 },
        { id: 10, name: 'Surya Enclave Apartment', lat: 26.883745061828574, long: 80.99692167561618 },
        { id: 11, name: 'Pragati Park', lat: 26.887472713717337, long: 80.99913802342216 },
        { id: 12, name: 'Munshipulia Metro', lat: 26.887922533887192, long: 80.99583934152658 },
        { id: 13, name: 'Lohiya Kalyan Mandap', lat: 26.886771065284435, long: 80.9948553095348 },
        { id: 14, name: 'Khad Rashab Vibhaag', lat: 26.887154222801346, long: 80.9994393877771 },
        { id: 15, name: 'Yusuf Tower', lat: 26.88210574599565, long: 80.00703010300995 },
        { id: 16, name: 'Chandan Hospital', lat: 26.87400455903241, long: 81.02403886827713 },
        { id: 17, name: 'Tambor', lat: 26.93140706489207, long: 80.91641648109679 },
        { id: 18, name: 'Eldeco City', lat: 26.929827974523004, long: 80.91163303513471 },
        { id: 19, name: 'Signature Green', lat: 26.928686879650552, long: 80.91050828611212 },
        { id: 20, name: 'Geeta Ashram', lat: 26.93344718644662, long: 80.90750892942678 },
        { id: 21, name: 'Maltipuram Devalaya', lat: 26.947938272502313, long: 80.95093777460797 },
        { id: 22, name: 'CMS Vardhan Khand', lat: 26.840858687384404, long: 81.010238242121 },
        { id: 23, name: 'Jeev Aasharaya', lat: 26.843877933582764, long: 80.99597001446844 },
        { id: 24, name: 'SRS Cinema', lat: 26.846134798300863, long: 80.98753026421257 },
        { id: 25, name: 'Marine Drive', lat: 26.84462179408578, long: 80.9712334172133 },
    ],
    toastMsg: null
}

export default function user(state = initialState, action) {
    switch (action.type) {
        case CALL_TOKEN.SUCCESS:
            localStorage.setItem('jwtToken', action.payload);
            return {
                ...state,
                login: true
            }
        case SEND_DATA.SUCCESS:
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        case SEND_TOAST.SUCCESS:
            return {
                ...state,
                toastMsg: action.payload,
            }
        case DELETE_DATA.SUCCESS:
            const filteredData = state.users.filter((item) => item.email !== action.payload);
            console.log(filteredData)
            return {
                ...state,
                users: filteredData,
            }

        default:
            return state;
    }

}