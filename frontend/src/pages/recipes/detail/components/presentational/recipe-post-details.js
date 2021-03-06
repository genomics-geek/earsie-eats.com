import React from 'react'

import { get } from 'lodash'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Feed, Grid } from 'semantic-ui-react'

import UserActivity from 'common/user-activity'


const RecipePostDetails = ({ pk, author, published, currentUser }) => (
	<Grid centered padded>
		<Feed className="Recipe-details-feed">
			<Feed.Event>
				<Feed.Content>
					<Feed.Summary>
						<Feed.User>{get(author, 'username')}</Feed.User> published this recipe &nbsp;
						<Feed.User>{moment(published).fromNow()}</Feed.User>
						&nbsp;&nbsp;
						<UserActivity
							app="recipes"
							model="recipe"
							objectId={pk}
							userId={currentUser}
						/>
					</Feed.Summary>
				</Feed.Content>
			</Feed.Event>
		</Feed>
	</Grid>
)


RecipePostDetails.propTypes = {
	pk: PropTypes.number.isRequired,
	author: PropTypes.shape({
		id: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
	}).isRequired,
	published: PropTypes.string,
	currentUser: PropTypes.string,
}


export default RecipePostDetails
