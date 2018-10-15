import React from 'react'

import { get } from 'lodash'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import Alert from 'common/alert'
import UserActivitySummary from './components/presentational/user-activity-summary'
import { ACTIVITY_COUNTS_QUERY } from './queries'


const UserActivity = ({ app, model, objectId, userId }) => (
	<Query
		query={ACTIVITY_COUNTS_QUERY}
		variables={{ user: userId, app, model, objectId }}
		fetchPolicy="network-only"
	>
		{({ loading, error, data, refetch }) => {
			if (loading) return null
			if (error) return <Alert type="error" message={`Authentication: ${error.message}`} />

			return (
				<UserActivitySummary
					refetch={refetch}
					app={app}
					model={model}
					objectId={objectId}
					userId={userId}
					totalComments={get(data, 'activityCounts.totalComments', 0)}
					upVotes={get(data, 'activityCounts.upVotes', 0)}
					downVotes={get(data, 'activityCounts.downVotes', 0)}
					upVoted={get(data, 'activityCounts.userUpVotes', 0) !== 0}
					downVoted={get(data, 'activityCounts.userDownVotes', 0) !== 0}
				/>
			)
		}}
	</Query>
)


UserActivity.propTypes = {
	app: PropTypes.string,
	model: PropTypes.string,
	objectId: PropTypes.number,
	userId: PropTypes.string,
}


export default UserActivity
