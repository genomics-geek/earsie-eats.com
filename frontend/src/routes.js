import React from 'react'
import Loadable from 'react-loadable'
import { Route, Switch } from 'react-router-dom'

import { AuthRoute } from 'common/auth'
import { AsyncLoader } from 'common/loaders'
import Home from 'pages/home'
import Login from 'pages/login'
import Register from 'pages/registration'


const App = Loadable({
  loader: () => import('pages'),
  loading: AsyncLoader
})


const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/app" render={() => <AuthRoute protectedComponent={<App />} />} />
    <Route exact path="/login/" component={Login} />
    <Route path="/register/" component={Register} />
  </Switch>
)


export default Routes
