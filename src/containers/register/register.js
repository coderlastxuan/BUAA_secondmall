import React, {Component} from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'
import {connect} from "react-redux";

import {Redirect} from 'react-router-dom'
import {register} from "../../redux/actions";
import Logo from '../../components/logo/logo'
import './register.css'
const ListItem = List.Item

class Register extends Component {
    state = {
        username: '',
        pwd: '',
        confirm_pwd: '',
        user_type: ''
    }

    handleChange = (type, value) => {
        this.setState({
            [type]: value
        })
        // console.log(this.state);
    }

    register = () => {
        this.props.register(this.state)
    }

    render() {
        const {user_type} = this.state
        const {msg, redirectTo} = this.props.user
        if (redirectTo) {
            return (
                <Redirect to={redirectTo}/>
            )
        }
        return (
            <div>
                <NavBar>BUAA secondhand mall</NavBar>
                <WhiteSpace/>                <WhiteSpace/>
                <Logo/>
                <WhiteSpace/>                <WhiteSpace/>
                <WingBlank>
                    <List>
                        {msg ? <div className="err_msg">{msg}</div> : null}
                        <WhiteSpace/>
                        <InputItem placeholder="用户名" onChange={(val) => this.handleChange('username',val)}>用户名：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder="密码" type="password" onChange={(val) => this.handleChange('pwd',val)}>密码：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder="确认密码" type="password" onChange={(val) => this.handleChange('confirm_pwd',val)}>确认密码：</InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>用户类型：</span>&nbsp;&nbsp;&nbsp;
                            <Radio checked={user_type==='consumer'} onChange={() => this.handleChange('user_type','consumer')}>客官</Radio>&nbsp;&nbsp;&nbsp;
                            <Radio checked={user_type==='seller'} onChange={() => this.handleChange('user_type','seller')}>店家</Radio>
                        </ListItem>
                        <WhiteSpace/>
                        <Button type="primary" onClick={this.register}>现在加入肯德基豪华午餐！</Button>
                        <WhiteSpace/>
                        <Button onClick={() => this.props.history.replace('/login')}>已有账号，放我进去！</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {register}
)(Register)