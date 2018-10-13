import React from 'react'

import DocumentTitle from 'react-document-title'
import { Link } from 'react-router-dom'
import { Container, Header, Icon } from 'semantic-ui-react'

import LoginForm from './components/presentational/login-form'

import './index.css'


const Login = () => (
	<Container className="login-form">
		<DocumentTitle title="Earsie Eats | Login" />
		<Header as='h2' icon textAlign="center" className="login-form">
			<Icon name='food' circular />
			<Header.Content>Earsie Eats Blog</Header.Content>
		</Header>
		<LoginForm />
		<Header as="h4" textAlign="center">
			<a href="/auth/password_reset/" style={{ paddingRight: '8%' }}>
				Forgot password?
			</a>
			<Link to="/register/">
				Don't have an account?
			</Link>
		</Header>
	</Container>
)


export default Login
