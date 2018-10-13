import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { get, replace } from 'lodash'

import { mutations } from 'common/auth'


class Login extends Component {
	onCompleted = data => {
		const { location, history } = this.props
    let fromPath = get(location, 'state.from.pathname')

    if (fromPath === undefined) {
      const search = get(location, 'search')
      fromPath = replace(search, '?next=', '')
    }

    if (fromPath === 'login' || fromPath === undefined) fromPath = '/app/home/'
    history.push(fromPath)
	}

	onError = error => {
		const { onChange } = this.props
		let value
		if (error.message.includes('status code 400')) {
			value = 'Incorrect credentials!'
		} else {
			value = 'Server error! Please try again. '
			value += 'If it happens again, please email genomics.geek.04.22@gmail.com'
		}

		onChange({}, {name: 'error', value})
	}

	render() {
		const { children, username, password, onChange } = this.props

		return (
			<Mutation
				mutation={mutations.LOGIN_MUTATION}
				variables={{ input: {username, password} }}
				onCompleted={this.onCompleted}
				onError={this.onError}
			>
				{(login, { loading, data }) => (
					React.cloneElement(
						children,
						{onClick: () => {
							login()
							if (onChange) onChange({}, 'loading', true)
						}}
					)

				)}
			</Mutation>
		)
	}
}


Login.propTypes = {
	children: PropTypes.node.isRequired,
	history: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	onChange: PropTypes.func,
	username: PropTypes.string,
	password: PropTypes.string,
}


export default withRouter(Login)
