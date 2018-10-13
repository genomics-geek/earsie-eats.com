import React, { Component } from 'react'

import { get, map, mapKeys } from 'lodash'
import PropTypes from 'prop-types'
import { withAlert } from 'react-alert'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { mutations } from 'common/auth'


class VerifyEmail extends Component {
	onCompleted = data => {
		const { history, alert } = this.props
    history.push('/login/')
		alert.success('Email has been verified!')
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
		const { children, match, onChange } = this.props

		return (
			<Mutation
				mutation={mutations.VERIFY_EMAIL_MUTATION}
				variables={{ input: {key: get(match, 'params.key')} }}
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


VerifyEmail.propTypes = {
	children: PropTypes.node.isRequired,
	history: PropTypes.object.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			key: PropTypes.string.isRequired,
		}).isRequired
	}).isRequired,
	onChange: PropTypes.func,
}


export default withAlert(withRouter(VerifyEmail))
