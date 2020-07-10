import React, {Component} from 'react'
import {NavBar, Button, InputItem, TextareaItem} from "antd-mobile";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'

import Portrait from '../../components/portrait/portrait'
import {update_user} from "../../redux/actions";

class SellerInfo extends Component {
    state = {
        portrait: '',
        commodity: '',
        brand: '',
        price: '',
        info: '',
    }

    selectPortrait = (portrait) => {
        this.setState({portrait})
    }

    update_user = () => {
        this.props.update_user(this.state)
    }

    handleChange = (type, val) => {
        this.setState({
            [type]: val
        })
    }

    render() {
        const {portrait, user_type} = this.props.user
        if (portrait) {
            const path = user_type === 'seller' ? '/seller' : '/consumer'
            return (
                <Redirect to={path}/>
            )
        }
        return (
            <div>
                <NavBar>店家信息完善</NavBar>
                <Portrait selectPortrait={this.selectPortrait}/>
                <InputItem onChange={(val) => this.handleChange('commodity',val)}>商品名:</InputItem>
                <InputItem onChange={(val) => this.handleChange('brand',val)}>品牌:</InputItem>
                <InputItem onChange={(val) => this.handleChange('price',val)}>价格:</InputItem>
                <TextareaItem title="店家说点啥:" row={3} onChange={(val => this.handleChange('info',val))}/>
                <Button type="primary" onClick={this.update_user}>完成注册</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {update_user}
)(SellerInfo)