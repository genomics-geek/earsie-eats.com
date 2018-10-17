import React from 'react'

import { get } from 'lodash'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { Button, Grid, Header } from 'semantic-ui-react'

import Alert from 'common/alert'

import { RECIPE_LIST_QUERY } from '../queries'
import RecipeCards from './components/presentational/recipe-cards'
import RecipeFilter from './components/presentational/recipes-filter'


const List = ({ history }) => (
	<Query query={RECIPE_LIST_QUERY}>
		{({ loading, error, data, refetch }) => {
			if (error) return <Alert type="error" message={`Recipe: ${error.message}`} />

			const recipes = get(data, 'allRecipes.edges', [])

			return (
				<Grid padded style={{ opacity: '0.9' }}>
					<Grid.Row textAlign="center">
							<Grid.Column width={16}>
								<Header className="Recipe-list-title" content="Checkout our Recipes!" />
								{get(data, 'currentUser.isStaff') && (
									<Button
										icon="add circle"
										content="Add a Recipe"
										color="black"
										size="large"
										onClick={() => history.push('/management/recipes/create')}
									/>
								)}
							</Grid.Column>
					</Grid.Row>

					<Grid.Row>
						<Grid.Column mobile={16} tablet={16} computer={6} largeScreen={4} style={{ paddingBottom: '3%' }}>
							<RecipeFilter loading={loading} refetch={refetch} numberOfRecipes={recipes.length} />
						</Grid.Column>

						<Grid.Column mobile={16} tablet={16} computer={10} largeScreen={12} textAlign="center">
							{!loading ? <RecipeCards loading={loading} data={recipes}/> : null}
						</Grid.Column>
					</Grid.Row>
				</Grid>
			)
		}}
	</Query>
)


List.propTypes = {
	history: PropTypes.object.isRequired,
}


export default withRouter(List)
