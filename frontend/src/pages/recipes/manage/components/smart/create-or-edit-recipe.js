import React from 'react'

import PropTypes from 'prop-types'
import { withAlert } from 'react-alert'
import { Mutation } from 'react-apollo'


const CreateOrEditRecipe = ({ mutation, alert, children, onCompleted, variables }) => (
	<Mutation
		mutation={mutation}
		variables={variables}
		onCompleted={data => {
			alert.success('Recipe saved!')
			if (onCompleted) onCompleted(data)
		}}
		onError={error => alert.error('Recipe could not be saved! ' + error.message)}
	>
		{create => React.cloneElement(children, {onClick: create})}
	</Mutation>
)


CreateOrEditRecipe.propTypes = {
	mutation: PropTypes.object.isRequired,
	alert: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
	onCompleted: PropTypes.func,
}


export default withAlert(CreateOrEditRecipe)
