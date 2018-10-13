import React from 'react'

import DocumentTitle from 'react-document-title'
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
	</Container>
)


export default Login
