import React from 'react'
import {combineReducers} from "redux";
import {AUTH_SUCCESS, ERR_MSG, RESET_USER, UPDATE_USER, USER_LIST, GET_MSGLIST, GET_MSG, READ_MSG} from "./action-types";
import {getRedirect} from "../utils";

//用户登录注册
const defaultUser = {username: '', user_type: 'seller'}
const user = (state = defaultUser, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            const {user_type, portrait} = action.data
            return {...action.data, redirectTo: getRedirect(user_type, portrait)}
        case ERR_MSG:
            return {...state, msg: action.data}
        case UPDATE_USER:
            return action.data
        case RESET_USER:
            return {...defaultUser, msg: action.data}
        default:
            return state
    }
}

//登录后显示其他用户的列表
const userlist = (state = [], action) => {
    switch (action.type) {
        case USER_LIST:
            return action.data
        default:
            return state
    }
}

//获取聊天信息
const defaultMsgList = {
    users: {},
    chatMsgs: [],
    unreadCount: 0
}
const chat = (state = defaultMsgList, action) => {
    switch (action.type) {
        case GET_MSGLIST:
            const {users, chatMsgs, userid} = action.data
            return {
                users,
                chatMsgs,
                unreadCount: chatMsgs.reduce((pre, cur) => pre + (!cur.read && cur.to === userid ? 1 : 0) , 0)
            }
        case GET_MSG:
            const {chatMsg} = action.data
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unreadCount: state.unreadCount + (!chatMsg.read && chatMsg.to === action.data.userid ? 1 : 0)
            }
        case READ_MSG:
            const {from, to, count} = action.data
            console.log({from, to, count})
            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map(msg => {
                    if (msg.from === from && msg.to === to) {
                        return {...msg, read: true}
                    }else {
                        return msg
                    }
                }),
                unreadCount: state.unreadCount - count
            }
        default:
            return state
    }
}

//组合reducers给容器组件的connect调用
export default combineReducers({
    user,
    userlist,
    chat
})