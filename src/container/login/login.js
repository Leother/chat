import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {login} from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'

@connect(
    state => state.user,
    {login}
)
    @imoocForm
class Login extends Component {
    constructor(props){
        super(props)

        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    register() {
        this.props.history.push('register')
    }

    handleLogin() {
        this.props.login(this.props.state)
    }
    render() {
        const redir = this.props.redirectTo
        return (
            <div>
                { redir && redir!='/login' ? <Redirect to={this.props.redirectTo} /> : null }
                <Logo></Logo>
                <WingBlank>
                    <List>
                        { this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null }
                        <InputItem
                            onChange={(v) => this.props.handleChange('user',v)}
                        >用户</InputItem>
                        <WhiteSpace />
                        <InputItem type="password"
                            onChange={(v) => this.props.handleChange('pwd',v)}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button onClick={this.handleLogin} type='primary'>登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login