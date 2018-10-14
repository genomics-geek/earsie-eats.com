import React from 'react'

import { get } from 'lodash'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'

import Alert from 'common/alert'

import { RECIPE_DETAIL_QUERY } from '../queries'
import RecipeView from './components/presentational/recipe-view'

import './index.css'


const Detail = ({ match }) => (
	<Query query={RECIPE_DETAIL_QUERY} variables={{ id: get(match, 'params.recipeId') }}>
		{({ loading, error, data }) => {
			if (loading) return <Loader active size="tiny" />
			if (error) return <Alert type="error" message={`Recipe: ${error.message}`} />

			return <RecipeView data={get(data, 'recipe')} />
		}}
	</Query>
)


Detail.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			recipeId: PropTypes.string.isRequired,
		}).isRequired
	}).isRequired
}


export default withRouter(Detail)
