import React from 'react'

import { get } from 'lodash'
import { Query } from 'react-apollo'
import { Grid, Header } from 'semantic-ui-react'

import Alert from 'common/alert'

import { RECIPE_LIST_QUERY } from '../queries'
import RecipeCards from './components/presentational/recipe-cards'
import RecipeFilter from './components/presentational/recipes-filter'


const List = () => (
	<Query query={RECIPE_LIST_QUERY}>
		{({ loading, error, data, refetch }) => {
			if (error) return <Alert type="error" message={`Recipe: ${error.message}`} />

			const recipes = get(data, 'allRecipes.edges', [])

			return (
				<Grid padded>
					<Grid.Row textAlign="center">
							<Grid.Column width={16}>
								<Header className="Recipe-list-title" content="Checkout our Recipes!" />
							</Grid.Column>
					</Grid.Row>

					<Grid.Row>
						<Grid.Column mobile={16} tablet={8} computer={4}>
							<RecipeFilter loading={loading} refetch={refetch} numberOfRecipes={recipes.length} />
						</Grid.Column>

						<Grid.Column mobile={16} tablet={8} computer={12}>
							{!loading ? <RecipeCards loading={loading} data={recipes}/> : null}
						</Grid.Column>
					</Grid.Row>
				</Grid>
			)
		}}
	</Query>
)


export default List
