import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Register from './register'
import VerifyEmail from './verify-email'


const RegisterRoutes = () => (
	<div>
		<Switch>
			<Route exact path="/register/" component={Register} />
	    <Route path="/register/verify-email/:key" component={VerifyEmail} />
		</Switch>
	</div>
)


export default RegisterRoutes
