import React from 'react'

import { get } from 'lodash'
import PropTypes from 'prop-types'
import { Container, Grid, Header, Segment } from 'semantic-ui-react'

import RecipeList from './recipe-list'
import RecipePostDetails from './recipe-post-details'


const RecipeView = ({ data }) => (
	<Grid padded>

		<Grid.Row textAlign="center">
			<Grid.Column width={16}>
				<Container>
					<Header className="Recipe-title" content={get(data, 'title')}/>
				</Container>

				<RecipePostDetails
					pk={get(data, 'pk')}
					author={get(data, 'author')}
					published={get(data, 'published')}
				/>
			</Grid.Column>
		</Grid.Row>

		<Grid.Row>
			<Grid.Column width={16}>
				<Segment textAlign="left" raised>
					<Header
						content="Description"
						textAlign="center"
						style={{ fontFamily: 'Indie Flower', fontSize: '25px' }}
					/>
					<div
						dangerouslySetInnerHTML={{__html: get(data, 'description')}}
						style={{ fontSize: '22px' }}
					/>
				</Segment>
			</Grid.Column>
		</Grid.Row>

		<Grid.Row>
			<Grid.Column width={8}>
				<Segment textAlign="left" raised>
					<Header
						className="Recipe-list"
						content="Ingredients"
						icon="food"
						style={{ fontFamily: 'Indie Flower', fontSize: '25px' }}
					/>
					<RecipeList items={get(data, 'ingredients.edges', [])} />
				</Segment>
			</Grid.Column>

			<Grid.Column width={8}>
				<Segment textAlign="left" raised>
					<Header
						className="Recipe-list"
						textAlign="center"
						content="Steps"
						icon="list ol"
						style={{ fontFamily: 'Indie Flower', fontSize: '25px' }}
					/>
					<Header size="medium">Total Time: {get(data, 'totalTime')} minutes</Header>
					<RecipeList items={get(data, 'steps.edges', [])} />
				</Segment>
			</Grid.Column>
		</Grid.Row>
	</Grid>
)


RecipeView.propTypes = {
	data: PropTypes.shape({
		id: PropTypes.string,
		pk: PropTypes.number,
		author: PropTypes.shape({
			id: PropTypes.string,
			username: PropTypes.string,
			email: PropTypes.string,
		}),
		title: PropTypes.string,
		description: PropTypes.string,
		image: PropTypes.string,
		published: PropTypes.string,
		isPublished: PropTypes.string,
		prepTime: PropTypes.number,
		cookTime: PropTypes.number,
		totalTime: PropTypes.number,
		servingSize: PropTypes.number,
		active: PropTypes.bool,
		ingredients: PropTypes.shape({
			edges: PropTypes.arrayOf(PropTypes.shape({
				node: PropTypes.shape({
					id: PropTypes.string,
					label: PropTypes.string,
				})
			}))
		}),
		steps: PropTypes.shape({
			edges: PropTypes.arrayOf(PropTypes.shape({
				node: PropTypes.shape({
					id: PropTypes.string,
					label: PropTypes.string,
				})
			}))
		}),
	})
}


export default RecipeView
