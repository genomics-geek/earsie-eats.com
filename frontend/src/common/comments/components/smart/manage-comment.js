import React from 'react'

import PropTypes from 'prop-types'
import { withAlert } from 'react-alert'
import { Mutation } from 'react-apollo'


const UserComment = ({ alert, children, mutation, variables, onCompleted }) => (
	<Mutation
		mutation={mutation}
		variables={variables}
		onCompleted={onCompleted}
		onError={error => alert.error(error.message)}
	>
		{userComment => React.cloneElement(children, {onClick: userComment})}
	</Mutation>
)


UserComment.propTypes = {
	alert: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
	onCompleted: PropTypes.func,
	mutation: PropTypes.object.isRequired,
	variables: PropTypes.shape({
		id: PropTypes.string,
		text: PropTypes.string,
		app: PropTypes.string,
		model: PropTypes.string,
		objectId: PropTypes.number,
	}),
}


export default withAlert(UserComment)
