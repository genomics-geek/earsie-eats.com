import React from 'react'

import PropTypes from 'prop-types'
import { Feed, Icon, Modal } from 'semantic-ui-react'

import UserComments from 'common/comments'
import UserAction from '../smart/user-action'


const UserActivitySummary = props => (
	<Feed.Meta>

		<UserAction
			app={props.app}
			model={props.model}
			objectId={props.objectId}
			user={props.userId}
			activityType="up_vote"
			refetch={props.refetch}
		>
			<Feed.Like>
				<Icon
					name="like"
					color={props.upVoted ? 'red' : undefined }
				/>
				{props.upVotes}
			</Feed.Like>
		</UserAction>

		<UserAction
			app={props.app}
			model={props.model}
			objectId={props.objectId}
			user={props.userId}
			activityType="down_vote"
			refetch={props.refetch}
		>
			<Feed.Like>
				<Icon
					name="thumbs down outline"
					color={props.downVoted ? 'blue' : undefined }
				/>
				{props.downVotes}
			</Feed.Like>
		</UserAction>

		<Modal
			trigger={
				<Feed.Like>
					<Icon name="comments" />
					{props.totalComments}
				</Feed.Like>
			}
		>
			<Modal.Content scrolling>
				<UserComments app={props.app} model={props.model} objectId={props.objectId} />
			</Modal.Content>
		</Modal>
	</Feed.Meta>
)


UserActivitySummary.propTypes = {
	refetch: PropTypes.func,
	app: PropTypes.string,
	model: PropTypes.string,
	objectId: PropTypes.number,
	userId: PropTypes.string,
	upVotes: PropTypes.number,
	upVoted: PropTypes.bool,
	downVotes: PropTypes.number,
	downVoted: PropTypes.bool,
	totalComments: PropTypes.number,
}


export default UserActivitySummary
