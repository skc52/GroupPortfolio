import {LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, CLEAR_ERRORS, REGISTER_FAIL, REGISTER_REQUEST
    , REGISTER_SUCCESS, LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAIL, LOGOUT_FAIL, LOGOUT_SUCCESS
    ,UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_RESET,
    CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_RESET,
    FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
    ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS,
    UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_RESET, UPDATE_USER_SUCCESS,
    DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_RESET, DELETE_USER_SUCCESS ,
    USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS
} from "../constants/userConstants";

export const userReducer = (state = {user:{}}, action) => {
    switch(action.type){
        
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading:true,
                isAuthenticated:false
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isAuthenticated:true,
                user:action.payload,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isAuthenticated:false,
                user:null,
            }
        case LOGOUT_FAIL:
            return {
                ...state,
                isLoading:false,
                error:action.payload,
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return {
                ...state,
                isLoading:false,
                isAuthenticated:false,
                error:action.payload,
                user:null,
            }
        default:
            return state;
    }
}



export const activateUserReducer = (state = {}, action) => {
    switch(action.type){
        
        default:
            return state;
    }
}