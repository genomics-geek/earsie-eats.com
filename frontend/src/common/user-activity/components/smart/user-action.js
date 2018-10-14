import React from 'react'

import PropTypes from 'prop-types'
import { withAlert } from 'react-alert'
import { Mutation } from 'react-apollo'

import { USER_ACTIVITY_MUTATION } from '../../mutations'


const UserAction = ({ alert, children, activityType, app, model, objectId, user, refetch }) => (
	<Mutation
		mutation={USER_ACTIVITY_MUTATION}
		variables={{ app, model, objectId, user, activityType }}
		onCompleted={refetch}
		onError={error => alert.error("User activity failed! " + error.message)}
	>
		{update => React.cloneElement(children, {onClick: update})}
	</Mutation>
)


UserAction.propTypes = {
	alert: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
	activityType: PropTypes.string.isRequired,
	refetch: PropTypes.func,
	app: PropTypes.string,
	model: PropTypes.string,
	objectId: PropTypes.number,
	user: PropTypes.string,
}


export default withAlert(UserAction)
