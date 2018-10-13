import React from 'react'

import { get } from 'lodash'
import { Query } from 'react-apollo'
import { Loader } from 'semantic-ui-react'

import { queries } from 'common/auth'
import Alert from 'common/alert'
import Menu from './components/presentational/menu'

import './index.css'


export const AppBar = () => (
  <Query query={queries.CURRENT_USER_QUERY} fetchPolicy="network-only">
    {({ loading, error, data }) => {
      if (loading) return <Loader active size="tiny" />
      if (error) return <Alert type="error" message={`Authentication: ${error.message}`} />

      const currentUser = get(data, 'currentUser')
      let authenticated = false
      if (currentUser) authenticated = true

      return (
        <Menu
          authenticated={authenticated}
          username={get(currentUser, 'username')}
          email={get(currentUser, 'email')}
        />
      )
    }}
  </Query>
)


export default AppBar
