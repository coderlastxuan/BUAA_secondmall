import React from 'react'
import io from 'socket.io-client'

import {AUTH_SUCCESS, ERR_MSG, RESET_USER, UPDATE_USER,
    USER_LIST, GET_MSG, GET_MSGLIST, READ_MSG} from "./action-types";
import {require_login, require_register, require_updateuser, require_user,
    require_userlist, require_readMsg, require_chatmsglist} from "../api";

import chat from "../containers/chat/chat";

//同步操作
export const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})  //登录或注册成功
export const errMsg = (msg) => ({type: ERR_MSG, data: msg})  //登录或注册失败，或前台表单验证确认密码错误

export const updateUser = (user) => ({type: UPDATE_USER, data: user})  //信息完善界面提交,或根据已有cookie登录
export const resetUser = (msg) => ({type: RESET_USER, data: msg})  //信息完善界面出错，或根据已有cookie登录失败

const userList = (userlist) => ({type: USER_LIST, data: userlist})  //根据用户类型获取主页面用户列表

const receiveMsgList = ({users, chatMsgs, userid}) => ({type: GET_MSGLIST, data:{users, chatMsgs, userid}}) //获取聊天信息列表
const receiveMsg = (chatMsg, userid) => ({type: GET_MSG, data:{chatMsg, userid}})  //接收某条消息
const changeUnread = ({from, to, count}) => ({type: READ_MSG, data: {from, to, count}})  //修改已读

//初始化socketIO
function initIO(dispatch, userid) {
    // 连接服务器 , 创建单例的socket对象
    if(!io.socket) {
        io.socket = io('ws://localhost:4000')
    }
    // 绑定 'receiveMessage' 的监听 , 来接收服务器发送的消息
    io.socket.on('serverReceiveMsg', function (chatMsg) {
        // console.log('浏览器端接收到消息:', chatMsg)
        if(chatMsg.to === userid || chatMsg.from === userid) {
            dispatch(receiveMsg(chatMsg, userid))
        }
    })
}

//获取消息列表，后面三个地方用到：注册后，登录后，获取用户
async function getMsgList(dispatch, userid) {
    initIO(dispatch, userid)
    const response = await require_chatmsglist()
    // console.log(response);
    const result = response.data
    if(result.code === 0) {
        const {users, chatMsgs} = result.data
        dispatch(receiveMsgList({users, chatMsgs, userid}))
    }
}

//异步操作
export const login = (user) => {
    const {username, pwd, confirm_pwd} = user
    if (!username) {
        return errMsg('请输入用户名！')
    } else if (!pwd) {
        return errMsg('请输入密码！')
    }
    return async dispatch => {
        const response = await require_login({username, pwd})
        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errMsg(result.msg))
        }
    }
}

export const register = (user) => {
    const {username, pwd, confirm_pwd, user_type} = user
    if (!username) {
        return errMsg('请输入用户名！')
    } else if (!pwd) {
        return errMsg('请输入密码！')
    } else if (!user_type) {
        return errMsg('哥，你买东西还是卖东西？')
    } else if (confirm_pwd !== pwd) {
        return errMsg('两次输入的密码不一致嗷')
    }
    return async dispatch => {
        const response = await require_register({username, pwd, user_type})
        console.log(response);
        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errMsg(result.msg))
        }
    }
}

export function update_user(user) {
    return async dispatch => {
        const response = await require_updateuser(user)
        const data = response.data
        if (data.code === 0) {
            dispatch(updateUser(data.data))
        } else {
            dispatch(resetUser(data.msg))
        }
    }
}

export function get_user() {
    return async dispatch => {
        const response = await require_user()
        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            dispatch(updateUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

export function user_list(user_type) {
    return async dispatch => {
        const response = await require_userlist(user_type)
        const result = response.data
        if (result.code === 0) {
            dispatch(userList(result.data))
        }
    }
}

//客户端给服务器发消息
export function sendMsg({from, to, content}) {
    return dispatch => {
        // console.log('client send', from, to, content)
        // initIO()
        io.socket.emit('clientSendMsg', {from, to, content})
    }
}

//更新和某人的消息为已读
export function readMsg(from, to) {
    return async dispatch => {
        const response = await require_readMsg(from)
        const result = response.data
        if(result.code===0) {
            const count = result.data
            dispatch(changeUnread({from, to, count}))
        }
    }
}




