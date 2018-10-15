import React from 'react'

import DocumentTitle from 'react-document-title'
import { Link } from 'react-router-dom'
import { Container, Header } from 'semantic-ui-react'

import RegisterForm from './components/presentational/register-form'

import './index.css'


const Register = () => (
	<div className="Register">
		<DocumentTitle title="Earsie Eats | Register" />
		<Container className="registration-form" style={{ opacity: '0.90' }}>
			<Header textAlign="center" className="registration-form" content="Yo, sign up!" />
			<Header as="h3" textAlign="center" style={{ paddingBottom: '5%' }}>
				Already have an account? Then please <Link to="/login/">sign in.</Link>
			</Header>
			<RegisterForm />
		</Container>
	</div>
)


export default Register
