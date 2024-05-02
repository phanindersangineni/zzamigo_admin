import {
    formatError,
    login,
    runLogoutTimer,
    saveTokenInLocalStorage,
    signUp,
} from '../../services/AuthService';
import { LoginForm, ChangeTenantPassword } from '../../services/CommonService';


export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFIRMED_ACTION = '[login action] confirmed login';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const LOGOUT_ACTION = '[Logout action] logout action';
export const CHANGEPASSWORD_ACTION = '[Changepassword action] changepassword action';
export const CHANGEPASSWORD_SUCCESS_ACTION = '[Changepasswordsuccess action] Changepasswordsuccess action'
export const CHANGEPASSWORD_FAILED_ACTION = '[Changepasswordfailed action] Changepasswordfailed action'
export const CHECK_NEW_CONFIRM_PASSWORD = '[Checknewconfirmpassword action] Checknewconfirmpassword action'

export function signupAction(email, password, history) {
    return (dispatch) => {
        signUp(email, password)
        .then((response) => {
            saveTokenInLocalStorage(response.data);
            /*runLogoutTimer(
                dispatch,
                response.data.expiresIn * 1000,
                history,
            );*/
            dispatch(confirmedSignupAction(response.data));
            history.push('/dashboard');
        })
        .catch((error) => {
            const errorMessage = formatError(error.response.data);
            dispatch(signupFailedAction(errorMessage));
        });
    };
}

export function logout(history) {
    localStorage.removeItem('userDetails');
    history.push('/login');
    return {
        type: LOGOUT_ACTION,
    };
}

export function loginAction(email, password, history) {
    return (dispatch) => {
        const postdata ={
            email:email,
            password:password
        }
        LoginForm(postdata)
            .then((response) => {
                if(response?.accessToken ==null){
                    dispatch(loginFailedAction(response.message));
                }else{
                saveTokenInLocalStorage(response);
               /* runLogoutTimer(
                    dispatch,
                    response.expiresIn * 1000,
                    history,
                );*/
                
                dispatch(loginConfirmedAction(response));
				history.push('/dashboard');      
               }          
            })
            .catch((error) => {
				//console.log(error);
                const errorMessage = formatError(error.response.data);
                dispatch(loginFailedAction(errorMessage));
            });
    };
}

export function loginFailedAction(data) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: data,
    };
}

export function loginConfirmedAction(data) {
    return {
        type: LOGIN_CONFIRMED_ACTION,
        payload: data,
    };
}

export function confirmedSignupAction(payload) {
    return {
        type: SIGNUP_CONFIRMED_ACTION,
        payload,
    };
}

export function signupFailedAction(message) {
    return {
        type: SIGNUP_FAILED_ACTION,
        payload: message,
    };
}

export function loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}

export function changePassword(history){
    history.push('/changepassword');
    return{
        type: CHANGEPASSWORD_ACTION,
      
    }
}

export function changePasswordSuccess(data){
    return{
        type: CHANGEPASSWORD_SUCCESS_ACTION,
        payload: data
    }
}

export function changePasswordFailed(data){
    return{
        type: CHANGEPASSWORD_FAILED_ACTION,
        payload: data
    }
}

export function checknewconfirmpassword(newPassword,confirmPassword){
if(newPassword==confirmPassword){
    return{
        type: CHECK_NEW_CONFIRM_PASSWORD,
        payload: "New Password and Confirm Password should be match"
    }
}
   
}


export function changepasswordaction(currentPassword, newPassword, confirmPassword, history){
    const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));
    console.log(constuserdetails,"constuserdetails")
   return(dispatch)=>{
    const postData = {
        currentpassword:currentPassword,
        newpassword: newPassword,
        confirmpassword: confirmPassword,
        userid: constuserdetails.id
    }
    ChangeTenantPassword(postData)
    .then(response=>{
        console.log(response,"check the response")
        if(response.data=="SUCCESS"){
            dispatch(changePasswordSuccess(response.data))
           setTimeout(()=>{
            localStorage.removeItem('userDetails');
            window.location.reload();
           },5000)
        }else{
            dispatch(changePasswordFailed(response.data))
        }

    })
   }

}