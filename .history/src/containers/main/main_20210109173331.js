import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {NavBar} from "antd-mobile";
import Cookies from 'js-cookie'

import SellerInfo from '../seller-info/seller-info'
import ConsumerInfo from '../consumer-info/consumer-info'
import Message from '../message/message'
import Personal from '../personal/personal'
import Seller from '../seller/seller'
import Consumer from '../consumer/consumer'
import FootNav from '../../components/foot-nav/foot-nav'
import Chat from '../../containers/chat/chat'

import {getRedirect} from "../../utils";
import {get_user} from "../../redux/actions";

class Main extends Component {
    navList = [ // 包含所有导航组件的相关信息数据
        {
            path: '/seller', // 路由路径
            component: Consumer,
            title: '客官列表',
            icon: 'dashen',
            text: '客官',
        },
        {
            path: '/consumer', // 路由路径
            component: Seller,
            title: '店家列表',
            icon: 'laoban',
            text: '店家',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]

    componentDidMount() {
        const userid = Cookies.get('userid')
        const {_id} = this.props.user
        if (userid && !_id) {
            //有cookie，没有redux，即登录过，但现在没登陆，所以发送请求登录获取user
            this.props.get_user()
        }
    }

    render() {
        const userid = Cookies.get('userid')
        if (!userid) {
            return <Redirect to='/login'/>
        }
        const {user, unreadCount} = this.props
        // console.log(unreadCount);
        const {user_type} = user
        if (!user._id) {
            return null
        }else {
            let path = this.props.location.pathname
            if (path === '/') {
                path = getRedirect(user_type, user.portrait)
                return <Redirect to={path}/>
            }
        }
        // debugger
        const {navList} = this
        const path = this.props.location.pathname;
        const current_nav = navList.find(nav => nav.path === path)
        if(current_nav) {
            // 决定哪个路由需要隐藏
            if(user.user_type==='seller') {
                // 隐藏数组的第2个
                navList[1].hide = true
            } else {
                // 隐藏数组的第1个
                navList[0].hide = true
            }
        }
        return (
            <div>
                {current_nav ? <NavBar>{current_nav.title}</NavBar> : null}
                <Switch>
                    {navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component}/>)}
                    <Route path="/sellerinfo" component={SellerInfo}/>
                    <Route path="/consumerinfo" component={ConsumerInfo}/>
                    <Route path="/chat/:id" component={Chat}/>
                    {user_type==='/seller' ? <Redirect to='/seller'/> : <Redirect to='/consumer'/>}
                </Switch>
                {current_nav ? <FootNav navList={navList} unreadCount={unreadCount} className="foot-nav"/> : null}
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user, unreadCount: state.chat.unreadCount}),   //mapStateToProps: func
    {get_user}     //mapDispatchToProps: func or obj
)(Main)