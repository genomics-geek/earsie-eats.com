import React from 'react'

import DocumentTitle from 'react-document-title'
import { Route, Switch } from 'react-router-dom'

import Menu from 'common/app-bar/index'
import About from './about'
import Blog from './blog'
import Home from './home'


const Pages = () => (
  <DocumentTitle title="Earsie Eats">
    <React.Fragment>
      <Menu />
      <Switch>
        <Route exact path="/app/" component={Home} />
        <Route exact path="/app/home/" component={Home} />
        <Route exact path="/app/home/" component={Home} />
        <Route exact path="/app/about/" component={About} />
        <Route exact path="/app/blog/" component={Blog} />
      </Switch>
    </React.Fragment>
  </DocumentTitle>
)


export default Pages
