import React from 'react'

import { Route, Switch } from 'react-router-dom'

import ManageRecipe from 'pages/recipes/manage'


const Routes = () => (
  <Switch>
    <Route exact path="/management/recipes/create/" component={ManageRecipe} />
    <Route exact path="/management/recipes/edit/:recipeId" component={ManageRecipe} />
  </Switch>
)


export default Routes
