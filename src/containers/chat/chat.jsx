/*
对话聊天的路由组件
*/
import React, {Component, useEffect, useState} from 'react'
import {NavBar, List, InputItem} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import {connect} from "react-redux";

import {readMsg, sendMsg} from '../../redux/actions'
import logo from "../../components/logo/logo";
import Grid from "antd-mobile/es/grid";
import Icon from "antd-mobile/es/icon";

const Item = List.Item

function Chat(props) {
    useEffect(() => {   //重开页面始终看到底部最新消息
        window.scrollTo(0, document.body.scrollHeight)
    })

    const [content, setContent] = useState('')
    const [emojis, setEmojis] = useState(['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
        ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
        ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
        ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'].map(item => ({text: item})))
    const [isShowEmojis, setShowEmojis] = useState(false)

    const {users, chatMsgs} = props.chat

    const from = props.user._id;     //我的id
    const to = props.match.params.id;     //当前聊天对象的id

    useEffect(() => {   //退出页面时发请求更新未读数量
        return () => {
            props.readMsg(to, from)
        }
    })

    if(Object.keys(users).length === 0 || Object.keys(props.user).length === 0) {
        return null
    }else {
        const chatid = [from, to].sort().join('_')
        const currentMsgs = chatMsgs.filter(msg => msg.chat_id === chatid)    //和当前聊天对象的聊天信息
        const to_portrait = users[to].portrait
        const to_name = users[to].username   //头部显示的聊天对象名
        const portrait_path = to_portrait ? require(`../../assets/imgs/${to_portrait}.png`) : null   //当前聊天对象的头像

        const sendClick = () => {       //发送消息
            const trim_content = content.trim()
            // console.log({from, to, content: trim_content})
            if (trim_content) {
                props.sendMsg({from, to, content: trim_content})
            }
            setContent('')
            setShowEmojis(false)
            window.scrollTo(0, document.body.scrollHeight)
        }

        const toggleShow = () => {     //点击表情切换显示隐藏表情栏
            setShowEmojis(isShowEmojis => !isShowEmojis)
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }

        return (
            <div id='chat-page'>
                <NavBar
                    icon={<Icon type='left'/>}
                    className='sticky-header'
                    onLeftClick={() => props.history.goBack()}
                >
                    {to_name}
                </NavBar>
                <List style={{marginTop:50, marginBottom: 50}}>
                    <QueueAnim type='left'>
                        {currentMsgs.map(msg => {
                            if(to === msg.from) {  //别人发给我的消息
                                return (
                                    <Item key={msg._id} thumb={portrait_path}>
                                        {msg.content}
                                    </Item>
                                )
                            }else {   //我发给其他人的消息，显示在右边
                                return (
                                    <Item key={msg._id} className="chat-me" extra="我">
                                        {msg.content}
                                    </Item>
                                )
                            }
                        })}
                    </QueueAnim>
                </List>
                <div className='am-tab-bar'>
                    {isShowEmojis ? (
                        <Grid
                            data={emojis}
                            columnNum={8}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={(item) => {
                                setContent(content => content + item.text)
                            }}
                        />
                    ) : null}
                    <InputItem
                        placeholder=" 请输入"
                        value={content}
                        onChange={value => setContent(value)}
                        onFocus={() => setShowEmojis(false)}
                        extra={
                            <>
                                <span onClick={toggleShow}>'😀'</span>
                                <span onClick={sendClick}>发送</span>
                            </>
                        }
                    />
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {sendMsg, readMsg}
)(Chat)