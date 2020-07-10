import React from 'react'

import {AUTH_SUCCESS, ERR_MSG, RESET_USER, UPDATE_USER, USER_LIST} from "./action-types";
import {require_login, require_register, require_updateuser, require_user, require_userlist} from "../api";

//同步操作
export const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})  //登录或注册成功
export const errMsg  = (msg) => ({type:ERR_MSG, data: msg})  //登录或注册失败，或前台表单验证确认密码错误
export const updateUser = (user) => ({type: UPDATE_USER, data: user})  //信息完善界面提交,或根据已有cookie登录
export const resetUser = (msg) => ({type: RESET_USER, data: msg})  //信息完善界面出错，或根据已有cookie登录失败
export const userList = (userlist) => ({type: USER_LIST, data: userlist})  //根据用户类型获取主页面用户列表


//异步操作
export const login = (user) => {
    const {username, pwd, confirm_pwd} = user
    if (!username) {
        return errMsg('请输入用户名！')
    }else if (!pwd) {
        return errMsg('请输入密码！')
    }
    return async dispatch => {
        const response = await require_login({username, pwd})
        const result = response.data
        if (result.code === 0) {
            dispatch(authSuccess(result.data))
        }else {
            dispatch(errMsg(result.msg))
        }
    }
}

export const register = (user) => {
    const {username, pwd, confirm_pwd, user_type} = user
    if (!username) {
        return errMsg('请输入用户名！')
    }else if (!pwd) {
        return errMsg('请输入密码！')
    }else if(!user_type) {
        return errMsg('哥，你买东西还是卖东西？')
    }else if (confirm_pwd !== pwd) {
        return errMsg('两次输入的密码不一致嗷')
    }
    return async dispatch => {
        const response = await require_register({username, pwd, user_type})
        // console.log(response);
        const result = response.data
        if (result.code === 0) {
            dispatch(authSuccess(result.data))
        } else{
            dispatch(errMsg(result.msg))
        }
    }
}

export function update_user(user) {
    return async dispatch => {
        const response = await require_updateuser(user)
        console.log(response);
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
        if (result.code===0) {
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


