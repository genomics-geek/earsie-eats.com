import React from 'react'

import DocumentTitle from 'react-document-title'
import { Container, Header } from 'semantic-ui-react'

import './index.css'


const About = () => (
	<div className="About">
		<DocumentTitle title="Earsie Eats | About" />
		<Container textAlign="center">
			<Header
				content="Hold tight! Coming soon..."
				color="blue"
				style={{
					paddingTop: '10%',
					fontFamily: 'Indie Flower, cursive',
					fontSize: "100px"
				}}
			/>
		</Container>
	</div>
)


export default About
