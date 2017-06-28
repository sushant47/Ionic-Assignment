const BASE_URL: string = 'https://extcafe.herokuapp.com';
export const API_KEY: string = "AIzaSyARBYHwwK5uPoNuS2iN3UOg8fQGRgHLz78";
export const SENDER_ID: string = '473136172745';
export const URL = {
    USER_LOGIN_URL: BASE_URL + '/api/login',
    USER_REGISTERATION_URL: BASE_URL + '/api/register',
    ADD_CAFE_URL: BASE_URL + '/api/addCafe',
    GET_CAFELIST_URL: BASE_URL + '/api/getCafeList',
    REGISTER_DEVICE: BASE_URL + '/api/registerDevice'
};

export const MAPS_URL = {
    GET_LOCATION_URL: 'https://maps.googleapis.com/maps/api/geocode/json?address=',
    API_KEY: '&key=AIzaSyARBYHwwK5uPoNuS2iN3UOg8fQGRgHLz78',
    REVERESE_GEOCODE_URL: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=',
    AUTOCOMPLETE_URL: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=',
    AUTOCOMPLETE_URL_PARAMETERS: '&types=establishment&components=country:ind&location=18.5204,73.8567&key=AIzaSyARBYHwwK5uPoNuS2iN3UOg8fQGRgHLz78'
};

export const SIGNUP_ALERT_CONSTANTS = {
    SIGNUP_LOADING_MESSAGE: 'Please wait. SignUp in progress..',
    SIGNUP_PASSWORD_MISSMATCH_ERROR_TITLE: 'Password Missmatch Error',
    SIGNUP_PASSWORD_MISSMATCH_ERROR_MSG: 'Password and Confirm password not matching!',
    SIGNUP_PASSWORD_MISSMATCH_ERROR_BTN: 'OK',
    SIGNUP_PASSWORD_LENGTH_ERROR_TITLE: 'Password Length error',
    SIGNUP_PASSWORD_LENGTH_ERROR_MSG: 'Password should be minimum 8 characters!',
    SIGNUP_PASSWORD_LENGTH_ERROR_BTN: 'OK',
    SIGNUP_INVALID_EMAIL_ERROR_TITLE: 'Invalid Email ID',
    SIGNUP_INVALID_EMAIL_ERROR_TITLE_MSG: 'Please enter a valid email ID!',
    SIGNUP_INVALID_EMAIL_ERROR_TITLE_BTN: 'OK',
    SIGNUP_PROCESS_ERROR_TITLE: 'Sign Up Error',
    SIGNUP_PROCESS_ERROR_TITLE_MSG: 'Please Check your internet Connection',
    SIGNUP_PROCESS_ERROR_TITLE_BTN: 'OK',
    SIGNUP_PROCESS_GENERIC_TITLE_MSG: 'Please Check entered details',
    SIGNUP_PROCESS_GENERIC_TITLE_BTN: 'OK',
    SIGNUP_PROCESS_DUPLICATE_EMAILID_REGISTRATION_ERROR_TITLE_MSG: 'Email ID already exists',
    SSIGNUP_PROCESS_DUPLICATE_EMAILID_REGISTRATION_ERROR_TITLE_BTN: 'OK'
};

export const STATUS_MSG = {
    STATUS_MSG_SUCCESS: 'SUCCESS',
    STATUS_MSG_ERROR: 'ERROR',
    STATUS_MSG_MESSAGE_FIRST_PARAM: 'Email Id',
    STATUS_MSG_MESSAGE_SECOND_PARAM: 'alredy exits'
}

export const LOGIN_ALERT_CONSTANTS = {
    LOGIN_LOADING_MESSAGE: 'Please wait. Login in progress..',
    LOGIN_CREDENTIALS_ERROR_TITLE: 'Login Error',
    LOGIN_CREDENTIALS_ERROR_TITLE_MSG: 'Please check Username and Password!',
    LOGIN_CREDENTIALS_ERROR_TITLE_BTN: 'OK',
    LOGIN_NETWORK_ERROR_TITLE: 'Login Error',
    LOGIN_NETWORK_ERROR_TITLE_MSG: 'Please check Network Connection!',
    LOGIN_NETWORK_ERROR_TITLE_BTN: 'OK'
}

export const SEGMENT_ALERT_CONSTANTS = {
    SEGMENT_LOADING_MESSAGE: 'Please wait. Displaying Cafelist',
    SEGMENT_LOADING_ERROR_TITLE: 'Unable to Fetch Cafe List',
    SEGMENT_LOADING_ERROR_TITLE_MSG: 'Please check your internet connection!',
    SEGMENT_LOADING_ERROR_TITLE_BTN: 'OK'
}