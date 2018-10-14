import React from 'react'
import { get, map } from 'lodash'

import { QUERY } from '../../queries/ingredients'
import { SearchDropdown } from 'common/drop-downs'


export const reformatOptions = data => map(get(data, 'allIngredients.edges', []), element => ({
  key: get(element, 'node.id'),
  value: get(element, 'node.id'),
  text: get(element, 'node.label')
}))


const IngredientsDropdown = props => (
  <SearchDropdown
    query={QUERY}
    variables={{ label: '' }}
    searchVariable="label"
    reformatOptions={reformatOptions}
    {...props}
  />
)


export default IngredientsDropdown
