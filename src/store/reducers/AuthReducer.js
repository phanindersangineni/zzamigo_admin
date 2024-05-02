import {
    LOADING_TOGGLE_ACTION,
    LOGIN_CONFIRMED_ACTION,
    LOGIN_FAILED_ACTION,
    LOGOUT_ACTION,
    SIGNUP_CONFIRMED_ACTION,
    SIGNUP_FAILED_ACTION,
    CHANGEPASSWORD_ACTION,
    CHANGEPASSWORD_SUCCESS_ACTION,
    CHANGEPASSWORD_FAILED_ACTION,
    CHECK_NEW_CONFIRM_PASSWORD

} from '../actions/AuthActions';

const initialState = {
    auth: {
        email: '',
        idToken: '',
        localId: '',
        expiresIn: '',
        refreshToken: '',
    },
    errorMessage: '',
    successMessage: '',
    showLoading: false,
};

const changepass ={
    errorMessage: '',
    successMessage: '',
}

export function AuthReducer(state = initialState, action) {
    if (action.type === SIGNUP_CONFIRMED_ACTION) {
        return {
            ...state,
            auth: action.payload,
            errorMessage: '',
            successMessage: 'Signup Successfully Completed',
            showLoading: false,
        };
    }
    if (action.type === LOGIN_CONFIRMED_ACTION) {
        return {
            ...state,
            auth: action.payload,
            errorMessage: '',
            successMessage: 'Login Successfully Completed',
            showLoading: false,
        };
    }

    if (action.type === LOGOUT_ACTION) {
        return {
            ...state,
            errorMessage: '',
            successMessage: '',
            auth: {
                email: '',
                idToken: '',
                localId: '',
                expiresIn: '',
                refreshToken: '',
            },
        };
    }

    if (
        action.type === SIGNUP_FAILED_ACTION ||
        action.type === LOGIN_FAILED_ACTION
    ) {
        return {
            ...state,
            errorMessage: action.payload,
            successMessage: '',
            showLoading: false,
        };
    }

    if (action.type === LOADING_TOGGLE_ACTION) {
        return {
            ...state,
            showLoading: action.payload,
        };
    }
    return state;
}


export function changePasswordReducer(state = changepass, action){
    if(action.type==CHANGEPASSWORD_SUCCESS_ACTION){
        return{
            ...state,
            successMessage: 'Password Changed SuccessFully, You are about to redirected to login page !!',
            errorMessage: '',
        }
    }
    if(action.type==CHANGEPASSWORD_FAILED_ACTION){
        return{
            ...state,
            successMessage: '',
            errorMessage: action.payload,

        }
    }
    if(action.type==CHECK_NEW_CONFIRM_PASSWORD){
        return{
            ...state,
            successMessage: '',
            errorMessage: action.payload,
        }
    }
    return state;
}
    
