import React from 'react'

import { get, map } from 'lodash'
import PropTypes from 'prop-types'
import { withAlert } from 'react-alert'
import { Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'

import Alert from 'common/alert'
import EditRecipeForm from './components/presentational/recipe-edit-form'
import { RECIPE_DETAIL_QUERY } from 'pages/recipes/queries'

import './index.css'


const ManageRecipe = ({ match }) => {
	const recipeId = get(match, 'params.recipeId')

	if (recipeId) {
		return (
			<Query query={RECIPE_DETAIL_QUERY} variables={{ id: recipeId }}>
				{({ loading, error, data, refetch }) => {
					if (loading) return <Loader active size="huge" />
					if (error) return <Alert type="error" message={`Loading Recipe: ${error.message}`} />

					return (
						<EditRecipeForm
							recipeId={recipeId}
							defaultTitle={get(data, 'recipe.title')}
							defaultImage={get(data, 'recipe.imageUrl')}
							defaultDescription={get(data, 'recipe.description')}
							defaultCookTime={get(data, 'recipe.cookTime')}
							defaultPrepTime={get(data, 'recipe.prepTime')}
							defaultServingSize={get(data, 'recipe.servingSize')}
							defaultActive={get(data, 'recipe.active')}
							defaultIngredients={map(get(data, 'recipe.ingredients.edges', []), x => get(x, 'node.label'))}
							defaultSteps={map(get(data, 'recipe.steps.edges', []), x => get(x, 'node.label'))}
						/>
					)
				}}
			</Query>
		)
	}

	return <EditRecipeForm />
}


ManageRecipe.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			recipeId: PropTypes.string.isRequired,
		}).isRequired
	}).isRequired,
}


export default withAlert(withRouter(ManageRecipe))
