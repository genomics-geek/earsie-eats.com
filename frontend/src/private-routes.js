import React from 'react'

import { Route, Switch } from 'react-router-dom'

import CreateRecipe from 'pages/recipes/create'

const Edit = () => <p>Edit Recipes</p>


const Routes = () => (
  <Switch>
    <Route exact path="/management/recipes/create/" component={CreateRecipe} />
    <Route exact path="/management/recipes/edit/:recipeId" component={Edit} />
  </Switch>
)


export default Routes
