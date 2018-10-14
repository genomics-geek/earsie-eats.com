import React from 'react'

import PropTypes from 'prop-types'
import { withAlert } from 'react-alert'
import { Mutation } from 'react-apollo'

import { CREATE_RECIPE_MUTATION } from 'pages/recipes/mutations'


const CreateRecipe = ({ alert, children, onCompleted, variables }) => (
	<Mutation
		mutation={CREATE_RECIPE_MUTATION}
		variables={variables}
		onCompleted={data => {
			alert.success('Recipe created!')
			if (onCompleted) onCompleted()
		}}
		onError={error => alert.error('Recipe could not be saved! ' + error.message)}
	>
		{create => React.cloneElement(children, {onClick: create})}
	</Mutation>
)


CreateRecipe.propTypes = {
	alert: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
	onCompleted: PropTypes.func,
}


export default withAlert(CreateRecipe)
