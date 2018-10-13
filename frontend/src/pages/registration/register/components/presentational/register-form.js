import React from 'react'
import { Button, Form, Message } from 'semantic-ui-react'

import { Register } from 'common/auth'


class RegisterForm extends React.Component {
	state = {
		email: '',
		username: '',
		password1: '',
		password2: '',
		loading: false,
		errors: []
	}

  handleChange = (e, { name, value }) => this.setState({[name]: value})

  render() {
    const { loading, errors, email, username, password1, password2 } = this.state

    return(
      <Form
          id="login-form"
          size="large"
          key="big"
          loading={loading}
					error={errors.length > 0}
        >
          <Form.Input
            id="email"
            name="email"
            placeholder="Email"
            icon="mail"
            iconPosition="left"
            required
            onChange={this.handleChange}
          />
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
            id="password1"
            name="password1"
            placeholder="Password"
            icon="lock"
            iconPosition="left"
            required
            onChange={this.handleChange}
            type="password"
          />
					<Form.Input
            id="password2"
            name="password2"
            placeholder="Confirm password"
            icon="lock"
            iconPosition="left"
            required
            onChange={this.handleChange}
            type="password"
          />

					<Message
						error
						list={errors}
					/>

					<Register
						email={email}
						username={username}
						password1={password1}
						password2={password2}
						onChange={this.handleChange}
					>
						<Button
							content="Sign Up!"
							secondary
							fluid
							size="large"
							disabled={!email || !username || !password1 || !password2}
						/>
					</Register>
        </Form>
    )
  }
}


export default RegisterForm
