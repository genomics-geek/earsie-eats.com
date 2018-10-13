import React from 'react'
import Loadable from 'react-loadable'
import { Route, Switch } from 'react-router-dom'

import { AuthRoute } from 'common/auth'
import { AsyncLoader } from 'common/loaders'
import Home from 'pages/home'


const App = Loadable({
  loader: () => import('pages'),
  loading: AsyncLoader
})


const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/app" render={() => <AuthRoute protectedComponent={<App />} />} />
  </Switch>
)


export default Routes
