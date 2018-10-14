import React from 'react'

import { Route, Switch } from 'react-router-dom'


const Create = () => <p>Create Recipes</p>
const Edit = () => <p>Edit Recipes</p>


const Routes = () => (
  <Switch>
    <Route exact path="/management/recipes/create/" component={Create} />
    <Route exact path="/management/recipes/edit/:recipeId" component={Edit} />
  </Switch>
)


export default Routes
