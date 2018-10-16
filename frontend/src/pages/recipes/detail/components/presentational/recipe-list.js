import React from 'react'

import { get, map } from 'lodash'
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'


const RecipeList = ({ items }) => (
	<List style={{ fontSize: '18px' }}>
		{map(items, item => (
			<List.Item
				key={get(item, 'node.id')}
				content={get(item, 'node.label')}
			/>
		))}
	</List>
)


RecipeList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string,
		label: PropTypes.string,
	})),
}


RecipeList.defaultProps = {
	items: [],
}


export default RecipeList
