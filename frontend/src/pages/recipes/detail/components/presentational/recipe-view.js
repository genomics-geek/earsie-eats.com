import React from 'react'

import { get } from 'lodash'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Grid, Header, Icon, Segment } from 'semantic-ui-react'

import RecipeList from './recipe-list'
import RecipePostDetails from './recipe-post-details'


const RecipeView = ({ data, currentUser, isStaff, history }) => (
	<Grid padded style={{ opacity: '0.9' }}>
		<Grid.Row textAlign="center">
			<Grid.Column width={16}>
				<Header className="Recipe-details-title" content={get(data, 'title')}/>
			</Grid.Column>
		</Grid.Row>

		<Grid.Row>
			<Grid.Column width={16}>
				<Segment raised>
					<RecipePostDetails
						pk={get(data, 'pk')}
						author={get(data, 'author')}
						currentUser={currentUser}
						published={get(data, 'published')}
					/>
					<Header
						content="Description"
						textAlign="center"
						style={{ fontFamily: 'Indie Flower', fontSize: '25px', marginTop: '2%'}}
					/>
					{isStaff && (
						<Icon
							name="edit"
							size="large"
							color="blue"
							style={{ cursor: 'pointer' }}
							onClick={() => history.push(`/management/recipes/edit/${get(data, 'id')}/`)}
						/>
					)}
					<br />
					<div
						className="Recipe-details-description"
						dangerouslySetInnerHTML={{__html: get(data, 'description')}}
					/>
				</Segment>
			</Grid.Column>
		</Grid.Row>

		<Grid.Row>
			<Grid.Column mobile={16} tablet={16} computer={8} style={{ paddingBottom: '3%' }}>
				<Segment raised>
					<Header
						className="Recipe-details-list-header"
						content="Ingredients"
						icon="food"
						textAlign="center"
						style={{ fontFamily: 'Indie Flower', fontSize: '25px' }}
					/>
					<RecipeList items={get(data, 'ingredients.edges', [])} />
				</Segment>
			</Grid.Column>

			<Grid.Column mobile={16} tablet={16} computer={8}>
				<Segment raised>
					<Header
						className="Recipe-details-list-header"
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
		imageUrl: PropTypes.string,
		published: PropTypes.string,
		isPublished: PropTypes.bool,
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
	}),
	currentUser: PropTypes.string,
	isStaff: PropTypes.bool,
	history: PropTypes.object.isRequired,
}


RecipeView.defaultProps = {
	isStaff: false,
}


export default withRouter(RecipeView)
