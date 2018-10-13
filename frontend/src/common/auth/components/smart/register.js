import React, { Component } from 'react'

import { get, map, mapKeys } from 'lodash'
import PropTypes from 'prop-types'
import { withAlert } from 'react-alert'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { mutations } from 'common/auth'


class Register extends Component {
	onCompleted = data => {
		const { history, alert } = this.props
    history.push('/')
		alert.success('Registration successful! Please check for account verification email!')
	}

	onError = error => {
		const { onChange } = this.props
		const statusCode = get(error.networkError, 'statusCode')
		const errors = []

		if (statusCode === 400) {
			mapKeys(get(error, 'networkError.result', {}), (values, key) => {
				map(values, value => errors.push(value))
			})
		}

		else if (statusCode === 500) {
			let message = 'Server error! Please try again. '
			message += 'If it continues to happen, please email genomics-geek.04.22@gmail.com'
			errors.push(message)
		}

		else errors.push(error.mesage)

		if (onChange) onChange({}, {name: 'errors', value: errors})
	}

	render() {
		const { children, email, username, password1, password2, onChange } = this.props

		return (
			<Mutation
				mutation={mutations.REGISTER_MUTATION}
				variables={{ input: {email, username, password1, password2} }}
				onCompleted={this.onCompleted}
				onError={this.onError}
			>
				{(register, { loading, data }) => (
					React.cloneElement(
						children,
						{onClick: () => {
							register()
							if (onChange) onChange({}, 'loading', true)
						}}
					)

				)}
			</Mutation>
		)
	}
}


Register.propTypes = {
	children: PropTypes.node.isRequired,
	history: PropTypes.object.isRequired,
	onChange: PropTypes.func,
	email: PropTypes.string,
	username: PropTypes.string,
	password1: PropTypes.string,
	password2: PropTypes.string,
}


export default withAlert(withRouter(Register))
