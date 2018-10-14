import React from 'react'

import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'
import { withRouter } from 'react-router-dom'
import { Button, Container, Header } from 'semantic-ui-react'

import './index.css'


export const Home = ({ history }) => (
  <div className="Home">
    <DocumentTitle title="Earsie Eats | Home" />
    <Container className="Home-header animated fadeInDown" textAlign="center">
      <Header size="huge" content="Earsie Eats Blog" />
      <Header className="detail" size="large" content="Food. Food. Food." />
      <Button
        content="Check out the blog!"
        color="red"
        size="massive"
        onClick={() => history.push('/app/recipes/')}
      />
    </Container>
  </div>
)


Home.propTypes = {
  history: PropTypes.object.isRequired,
}


export default withRouter(Home)
