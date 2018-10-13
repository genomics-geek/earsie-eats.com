import React from 'react'

import DocumentTitle from 'react-document-title'
import { Button, Container, Header } from 'semantic-ui-react'

import { VerifyEmail as Verify } from 'common/auth'

import './index.css'


const VerifyEmail = () => (
	<div className="Register">
		<DocumentTitle title="Earsie Eats | Verify Email" />
		<Container className="registration-form">
			<Header textAlign="center" className="registration-form" content="Thanks for verifying your email!" />
			<Header textAlign="center">
				<Verify><Button content="Verify Email" color="red" size="huge" /></Verify>
			</Header>
		</Container>
	</div>
)


export default VerifyEmail
