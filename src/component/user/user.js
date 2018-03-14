import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Button,Modal } from 'antd-mobile';
import browserCookies from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
@connect(
    state=>state.user,
    {logoutSubmit}
)
class User extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout() {
        const alert = Modal.alert
        alert('注销','确认退出吗？',[
            { text: '取消', onPress: () => {}},
            { text: '确认', onPress: () => {
                    browserCookies.erase('userid')
                    this.props.logoutSubmit()
                }}
        ])
        // console.log("logout")

    }
    render() {
        const props = this.props;
        const Item = List.Item
        const Brief = List.Item.Brief
        if(!props) {}
        return props.user?(

            <div>

                <Result
                    img={<img src={require(`../img/${props.avatar}.png`)} style={{width:50}} alt=""/>}
                    title={props.user}
                    msg={props.type=='boss'?props.company:null}
                />
                <List renderHeader={()=>props.type == 'boss' ? '招聘信息' : '求职信息'}>
                    <Item multipleLine>
                        {props.title}
                        {props.desc.split('\n').map(v=>(
                            <Brief key={v}>{v}</Brief>
                        ))}
                        {props.money?<Brief>薪资:{props.money}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>
            </div>
        ): <Redirect to={props.redirectTo} />
    }
}

export default User