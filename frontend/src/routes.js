import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Home from 'pages/home'


const Routes = () => (
  <Switch>
    <Redirect exact path="/" to="/app/" />
    <Route exact path="/app/" component={Home} />
    <Route exact path="/app/home/" component={Home} />
  </Switch>
)


export default Routes
