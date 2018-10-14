import React from 'react'

import { get } from 'lodash'
import { Query } from 'react-apollo'
import DocumentTitle from 'react-document-title'
import { Grid, Header, Loader } from 'semantic-ui-react'

import Alert from 'common/alert'

import { RECIPE_LIST_QUERY } from '../queries'
import RecipeCards from './components/presentational/recipe-cards'
import RecipeFilter from './components/presentational/recipes-filter'

import './index.css'


const List = () => (
	<Query query={RECIPE_LIST_QUERY}>
		{({ loading, error, data, refetch }) => {
			if (loading) return <Loader active size="tiny" />
			if (error) return <Alert type="error" message={`Recipe: ${error.message}`} />

			const recipes = get(data, 'allRecipes.edges', [])

			return (
				<div className="Recipe-list">
					<DocumentTitle title="Earsie Eats | Recipes"/>
					<Grid padded>
						<Grid.Row textAlign="center">
								<Grid.Column width={16}>
									<Header className="Recipe-list-title" content="Checkout our Recipes!" />
								</Grid.Column>
						</Grid.Row>

						<Grid.Row>
							<Grid.Column mobile={16} tablet={8} computer={4}>
								<RecipeFilter refetch={refetch} numberOfRecipes={recipes.length} />
							</Grid.Column>

							<Grid.Column mobile={16} tablet={8} computer={4}>
								<RecipeCards data={recipes}/>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			)
		}}
	</Query>
)


export default List
