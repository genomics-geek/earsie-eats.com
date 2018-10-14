import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Detail from './detail'
import List from './list'


const RecipeRoutes = () => (
	<div className="Recipe">
		<Switch>
			<Route exact path="/app/recipes/" component={List} />
			<Route exact path="/app/recipes/:recipeId" component={Detail} />
		</Switch>
	</div>
)


export default RecipeRoutes
