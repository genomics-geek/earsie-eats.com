import React from 'react'

import { get } from 'lodash'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Feed } from 'semantic-ui-react'

import UserActivity from 'common/user-activity'


const RecipePostDetails = ({ pk, author, published }) => (
	<Feed className="Recipe-details" size="large">
		<Feed.Event>
			<Feed.Content>
				<Feed.Summary>
					<Feed.User>{get(author, 'username')}</Feed.User> published this recipe
					<Feed.Date>{moment(published).fromNow()}</Feed.Date>
					&nbsp;&nbsp;
					<UserActivity
						app="recipes"
						model="recipe"
						objectId={pk}
						userId={get(author, 'id')}
					/>
				</Feed.Summary>
			</Feed.Content>
		</Feed.Event>
	</Feed>
)


RecipePostDetails.propTypes = {
	pk: PropTypes.number.isRequired,
	author: PropTypes.shape({
		id: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
	}).isRequired,
	published: PropTypes.string,
}


export default RecipePostDetails
