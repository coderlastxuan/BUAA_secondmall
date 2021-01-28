import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {TabBar} from "antd-mobile";
import PropTypes from 'prop-types'

const Item = TabBar.Item

class FootNav extends Component {
    static propTypes = {
        navList: PropTypes.array.isRequired,
        unreadCount: PropTypes.number.isRequired
    }

    render() {
        let {navList, unreadCount} = this.props
        console.log(unreadCount);
        // 过滤掉hide为true的nav
        navList = navList.filter(nav => !nav.hide)
        const path = this.props.location.pathname // 请求的path
        return (
            <TabBar>
                {navList.map(nav => (<Item key={nav.path}
                                           title={nav.text}
                                           badge={nav.path === '/message' && unreadCount !== 0 ? unreadCount : null }
                                           icon={{uri: require(`./images/${nav.icon}.png`)}}
                                           selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                                           onPress={() => this.props.history.replace(nav.path)}
                                           selected={path === nav.path}/>))
                }
            </TabBar>
        )
    }
}

export default withRouter(FootNav)