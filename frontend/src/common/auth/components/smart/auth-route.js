import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { Redirect, withRouter } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'
import { get } from 'lodash'

import Alert from 'common/alert'

import { queries } from 'common/auth'


export const AuthRoute = ({ redirectTo, location, protectedComponent }) => (
  <Query query={queries.CURRENT_USER_QUERY} fetchPolicy="network-only">
    {({ loading, error, data }) => {
      if (loading) return <Loader active size="tiny" />
      if (error) return <Alert type="error" message={`Authentication: ${error.message}`} />

      if (get(data, 'currentUser')) return protectedComponent
      else return <Redirect to={{pathname: redirectTo, state: {from: location}}} />
    }}
  </Query>
)


AuthRoute.propTypes = {
  location: PropTypes.object,
  redirectTo: PropTypes.string,
  protectedComponent: PropTypes.element.isRequired,
}


AuthRoute.defaultProps = {
  redirectTo: '/login/'
}


export default withRouter(AuthRoute)
