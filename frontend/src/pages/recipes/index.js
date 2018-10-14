import React from 'react'

import DocumentTitle from 'react-document-title'
import { Route, Switch } from 'react-router-dom'

import Detail from './detail'
import List from './list'

import './index.css'


const RecipeRoutes = () => (
	<div className="Recipe">
		<DocumentTitle title="Earsie Eats | Recipes"/>
		<Switch>
			<Route exact path="/app/recipes/" component={List} />
			<Route exact path="/app/recipes/:recipeId" component={Detail} />
		</Switch>
	</div>
)


export default RecipeRoutes
