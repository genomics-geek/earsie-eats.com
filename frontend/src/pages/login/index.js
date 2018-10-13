import React from 'react'
import { Container, Header, Icon } from 'semantic-ui-react'

import LoginForm from './components/presentational/login-form'

import './index.css'


const Login = () => (
	<Container fluid className="login-form">
		<Header as='h2' icon textAlign="center" className="login-form">
			<Icon name='food' circular />
			<Header.Content>Earsie Eats Blog</Header.Content>
			</Header>
		<LoginForm />
	</Container>
)


export default Login
