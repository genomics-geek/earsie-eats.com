import React from 'react'

import { get, map } from 'lodash'
import moment from 'moment'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Card, Icon, Image, List } from 'semantic-ui-react'


const RecipeCards = ({ data, history }) => (
	<Card.Group className="centered">
		{map(data, item => (
			<Card
				raised
				key={get(item, 'node.id')}
				onClick={() => history.push(`/app/recipes/${get(item, 'node.id')}/`)}
			>
				<Card.Content>
					<Image src={get(item, 'node.imageUrl')} />
					<Card.Header style={{ paddingTop: '8%', paddingBottom: '4%'}} content={get(item, 'node.author.username')} />
					<Card.Meta content={`Published ${moment(get(item, 'node.published')).fromNow()}`}/>

					<Card.Description>
						<h3>{get(item, 'node.title')}</h3>
						<List horizontal>
							<List.Item>
								{get(item, 'node.totalIngredients')} Ingredients
							</List.Item>
							<List.Item>
								{get(item, 'node.totalSteps')} Steps
							</List.Item>
							<List.Item>
								{get(item, 'node.totalTime')} mins
							</List.Item>
						</List>
	        </Card.Description>
				</Card.Content>

				<Card.Content textAlign="center" extra>
					<Icon name="heart" color="red" />
		      {get(item, 'node.totalUpVotes')}
					&nbsp;&nbsp;
					<Icon name="thumbs down" color="blue" />
					{get(item, 'node.totalDownVotes')}
					&nbsp;&nbsp;
					<Icon name="comments" />
					{get(item, 'node.totalComments')}
				</Card.Content>
			</Card>
		))}
	</Card.Group>
)


RecipeCards.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		node: PropTypes.shape({
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
			totalComments: PropTypes.number,
			totalDownVotes: PropTypes.number,
			totalIngredients: PropTypes.number,
			totalSteps: PropTypes.number,
			totalUpVotes: PropTypes.number,
		})
	})),
	history: PropTypes.object.isRequired,
}


export default withRouter(RecipeCards)
