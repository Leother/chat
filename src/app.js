import React from 'react'
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusInfo/geniusInfo'
import AuthRoute from './component/authroute/authroute'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
import { Route, Switch } from 'react-router-dom'

class App extends React.Component {
    render() {
        return (
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/geniusinfo' component={GeniusInfo}></Route>
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/chat/:user' component={Chat}/>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        )
    }
}

export default App