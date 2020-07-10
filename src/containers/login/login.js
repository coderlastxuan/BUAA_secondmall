import React, {Component} from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {login} from '../../redux/actions'

class Login extends Component {
    state = {
        username: '',
        pwd: '',
    }

    handleChange = (type, value) => {
        this.setState({
            [type]: value
        })
        console.log(this.state);
    }

    login = () => {
        this.props.login(this.state)
    }

    render() {
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
                        {msg ? <div>{msg}</div> : null}
                        <WhiteSpace/>
                        <InputItem placeholder="用户名" onChange={(val) => this.handleChange('username',val)}>用户名：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder="密码" type="password" onChange={(val) => this.handleChange('pwd',val)}>密码：</InputItem>
                        <WhiteSpace/>
                        <Button type="primary" onClick={this.login}>进去挑挑货</Button>
                        <WhiteSpace/>
                        <Button onClick={() => this.props.history.replace('/register')}>容我先去注个册...</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {login}
)(Login)