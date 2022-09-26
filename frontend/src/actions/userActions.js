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
import axios from 'axios';

//REGISTER
export const register = (userData) => async(dispatch) => {
    try {
        dispatch({type:REGISTER_REQUEST});
        const config = {headers:{"Content-Type":"multipart/form-data"}};
        const {data} = await axios.post(
            `api/v1/registeruser`,
            userData,
            config
        )

        dispatch({type:REGISTER_SUCCESS, payload:data.user})

    } catch (error) {
        dispatch({type:REGISTER_FAIL, payload:error.response.data.error});
    }
}

//LOGIN
export const login = (userData) => async(dispatch)=>{
    try {
        dispatch({type:LOGIN_REQUEST});
        const config = {headers:{"Content-type":"multipart/form-data"}};
        const {data} = await axios.post(
            `ap1/v1/loginUser`,
            userData,
            config
        )

        dispatch({type:LOGIN_SUCCESS, payload:data.user})

    } catch (error) {
        dispatch({type:LOGIN_FAIL, payload:error.response.data.error});
    }
}

// LOGOUT
export const logout = () => async(dispatch) => {
    try {
        await axios.get(`/api/v1/logoutUser`);
        dispatch({type:LOGOUT_SUCCESS});
    } catch (error) {
        dispatch({type:LOGOUT_FAIL, payload:error.response.data.error});
    }
}