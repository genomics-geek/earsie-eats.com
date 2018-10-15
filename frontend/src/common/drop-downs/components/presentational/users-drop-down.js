import React from 'react'
import { get, map } from 'lodash'

import { QUERY } from '../../queries/users'
import { SearchDropdown } from 'common/drop-downs'


export const reformatOptions = data => map(get(data, 'allUsers.edges', []), element => ({
  key: get(element, 'node.id'),
  value: get(element, 'node.id'),
  text: get(element, 'node.username')
}))


const UsersDropdown = props => (
  <SearchDropdown
    query={QUERY}
    variables={{ username: '' }}
    searchVariable="username"
    reformatOptions={reformatOptions}
    {...props}
  />
)


export default UsersDropdown
