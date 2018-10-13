import React from 'react'
import { Route, Switch } from 'react-router-dom'
import DocumentTitle from 'react-document-title'

import Home from './home'
import About from './about'
import Blog from './blog'


const App = () => (
  <DocumentTitle title="Earsie Eats">
    <React.Fragment>
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


export default App
