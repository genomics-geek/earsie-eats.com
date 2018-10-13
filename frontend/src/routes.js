import React from 'react'

import { Redirect, Route, Switch } from 'react-router-dom'


const Home = () => <p>Place Holder</p>


const Routes = () => (
  <Switch>
    <Redirect exact path="/" to="/app/" />
    <Route exact path="/app/" component={Home} />
  </Switch>
)


export default Routes
