import React from 'react'

import './index.css'

import DocumentTitle from 'react-document-title'
import { Container, Header } from 'semantic-ui-react'


export const Home = ({ history }) => (
  <div className="Home">
    <DocumentTitle title="Earsie Eats | Home" />
    <Container className="Home-header animated fadeInDown" textAlign="center">
      <Header size="huge" content="Earsie Eats Blog" />
      <Header className="detail" size="large" content="Food. Food. Food." />
    </Container>
  </div>
)


export default Home
