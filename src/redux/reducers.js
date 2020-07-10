import React from 'react'
import {combineReducers} from "redux";
import {AUTH_SUCCESS, ERR_MSG, RESET_USER, UPDATE_USER, USER_LIST} from "./action-types";
import {getRedirect} from "../utils";

const defaultUser = {username:'', user_type: 'seller'}
const user = (state=defaultUser, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            const {user_type, portrait} = action.data
            return {...action.data, redirectTo:getRedirect(user_type,portrait)}
        case ERR_MSG:
            return {...state, msg:action.data}
        case UPDATE_USER:
            return action.data
        case RESET_USER:
            return {...defaultUser, msg:action.data}
        default:
            return state
    }
}

const userlist = (state=[], action) => {
    switch (action.type) {
        case USER_LIST:
            return action.data
        default:
            return state
    }
}

export default combineReducers({
    user,
    userlist
})