import React, {Component} from 'react'
import {connect} from "react-redux";
import {List, Badge} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'

const Item = List.Item
const Brief = Item.Brief

function Message(props) {
    const {users, chatMsgs} = props.chat
    const myId = props.user._id    //当前用户的id
    // console.log(chatMsgs);

    const lastMsgMap = new Map()
    chatMsgs.forEach(msg => {
        msg.unread = (!msg.read) && msg.to === myId ? 1 : 0
        let chat = lastMsgMap.get(msg.chat_id)
        if (chat) {
            const newUnread = chat.unread + msg.unread
            if (msg.create_time > chat.create_time) {
                lastMsgMap.set(msg.chat_id, Object.assign(msg, {unread: newUnread}))
            }
        } else {
            lastMsgMap.set(msg.chat_id, msg)
        }
    })
    const lastMsgs = Array.from(lastMsgMap.values())
    // console.log(lastMsgs);
    lastMsgs.sort((m1, m2) => {
        return m2.create_time - m1.create_time
    })

    return (
        <List>
            <QueueAnim type='scale'>
                {lastMsgs.map(msg => {
                        const hisId = myId === msg.from ? msg.to : msg.from    //该列对应聊天对象的id
                        return (
                            <Item
                                extra={<Badge text={msg.unread}/>}
                                thumb={require(`../../assets/imgs/${users[hisId].portrait}.png`)}
                                arrow='horizontal'
                                key={msg.chat_id}
                                onClick={() => props.history.push(`/chat/${hisId}`)}
                            >
                                {msg.content}
                                <Brief>{users[hisId].username}</Brief>
                            </Item>
                        )
                    }
                )}
            </QueueAnim>
        </List>
    )
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {}
)(Message)