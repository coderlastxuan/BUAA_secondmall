import React from 'react'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class Personal extends React.Component {
    logout = () => {
        Modal.alert('退出','你确定退出吗？',[
            {text:'取消'},
            {text:'确定', onPress:()  => {
                    Cookies.remove('userid')
                    this.props.resetUser()
                }}
        ])
    }

    render() {
        const {username, info, portrait, brand, commodity, price} = this.props.user
        return (
            <div style={{marginBottom:50, marginTop:50}}>
                <Result
                    img={<img src={require(`../../assets/imgs/${portrait}.png`)} style={{width: 50}} alt="header"/>}
                    title={username}
                    message={brand}
                />

                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                        <Brief>商品: {commodity}</Brief>
                        <Brief>简介: {info}</Brief>
                        {price ? <Brief>价格: {price}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Button type='warning' onClick={this.logout}>退出登录</Button>
                </List>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {resetUser}
)(Personal)