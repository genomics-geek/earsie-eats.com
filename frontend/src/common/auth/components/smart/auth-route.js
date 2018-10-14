import React from 'react'

import { get } from 'lodash'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { Redirect, withRouter } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'

import Alert from 'common/alert'
import { queries } from 'common/auth'


export const AuthRoute = ({ redirectTo, location, protectedComponent, staffOnly }) => (
  <Query query={queries.CURRENT_USER_QUERY} fetchPolicy="network-only">
    {({ loading, error, data }) => {
      if (loading) return <Loader active size="tiny" />
      if (error) return <Alert type="error" message={`Authentication: ${error.message}`} />

      if (get(data, 'currentUser')) {

        if (staffOnly) {
          if (get(data, 'currentUser.isStaff')) return protectedComponent
          else return <Alert type="error" message="Must be staff to access this content!" />
        }

        else return protectedComponent
      }

      else return <Redirect to={{pathname: redirectTo, state: {from: location}}} />
    }}
  </Query>
)


AuthRoute.propTypes = {
  location: PropTypes.object,
  redirectTo: PropTypes.string,
  protectedComponent: PropTypes.element.isRequired,
  staffOnly: PropTypes.bool,
}


AuthRoute.defaultProps = {
  redirectTo: '/login/',
  staffOnly: false,
}


export default withRouter(AuthRoute)
