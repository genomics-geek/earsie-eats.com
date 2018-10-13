import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { withAlert } from 'react-alert'
import { withRouter } from 'react-router-dom'

import { mutations } from 'common/auth'


const Logout = ({ alert, children, history }) => (
	<Mutation
		mutation={mutations.LOGOUT_MUTATION}
		variables={{ input: {} }}
		onCompleted={data => history.push('/')}
		onError={error => alert.error("Could not log out! " + error.message)}
	>
		{logout => React.cloneElement(children, {onClick: logout})}
	</Mutation>
)


Logout.propTypes = {
	alert: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
	history: PropTypes.object.isRequired,
}


export default withAlert(withRouter(Logout))
