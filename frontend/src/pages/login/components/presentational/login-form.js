import React from 'react'
import { Button, Form, Message } from 'semantic-ui-react'

import { Login } from 'common/auth'


class LoginForm extends React.Component {
	state = {
		username: '',
		password: '',
		loading: false,
		error: ''
	}

  handleChange = (e, { name, value }) => this.setState({[name]: value})

  render() {
    const { loading, error, username, password } = this.state

    return(
      <Form
          id="login-form"
          size="large"
          key="big"
          loading={loading}
        >
          <Form.Input
            id="username"
            name="username"
            placeholder="Username"
            icon="user"
            iconPosition="left"
            required
            onChange={this.handleChange}
          />
          <Form.Input
            id="password"
            name="password"
            placeholder="Password"
            icon="lock"
            iconPosition="left"
            required
            onChange={this.handleChange}
            type="password"
          />

          {error
						? (
						<Message negative>
               <Message.Header as="h5">Login Failed</Message.Header>
               <p>{error}</p>
              </Message>
						) : ( '' )
          }
					<Login
						username={username}
						password={password}
						onChange={this.handleChange}
					>
						<Button
							content="Sign In"
							primary
							fluid
							size="large"
							disabled={!username || !password}
						/>
					</Login>
        </Form>
    )
  }
}


export default LoginForm
