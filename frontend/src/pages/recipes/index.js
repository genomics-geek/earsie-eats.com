import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Detail from './detail'


const RecipeRoutes = () => (
	<div>
		<Switch>
			<Route exact path="/app/recipes/:recipeId" component={Detail} />
		</Switch>
	</div>
)


export default RecipeRoutes
