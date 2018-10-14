import React from 'react'

import Loadable from 'react-loadable'
import { Route, Switch } from 'react-router-dom'

import Menu from 'common/app-bar'
import { AuthRoute } from 'common/auth'
import { AsyncLoader } from 'common/loaders'

import About from 'pages/about'
import Home from 'pages/home'
import Login from 'pages/login'
import Recipes from 'pages/recipes'
import Register from 'pages/registration'


const PrivateRoutes = Loadable({
  loader: () => import('private-routes'),
  loading: AsyncLoader
})


const Routes = () => (
  <React.Fragment>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/app/" component={Home} />
      <Route exact path="/app/home/" component={Home} />
      <Route exact path="/app/about/" component={About} />
      <Route path="/app/recipes/" component={Recipes} />
      <Route exact path="/login/" component={Login} />
      <Route path="/register/" component={Register} />
      <Route path="/management/" render={() => <AuthRoute protectedComponent={<PrivateRoutes />} />} />
    </Switch>
  </React.Fragment>
)


export default Routes
