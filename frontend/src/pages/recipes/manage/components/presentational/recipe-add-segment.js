import React, { Component } from 'react'

import { map } from 'lodash'
import PropTypes from 'prop-types'
import { Button, Divider, Header, Icon, Input, List, Segment } from 'semantic-ui-react'


class RecipeAddSegment extends Component {
	state = { label: '' }

	onChange = (e, {name, value}) => this.setState({ [name]: value })

	onAddItem = () => {
		const { onAddItem } = this.props
		const { label } = this.state

		this.setState({ label: '' })
		onAddItem(label)
	}

	render() {
		const { header, icon, items, onRemoveItem } = this.props
		const { label } = this.state

		return (
			<Segment>
				<Header
					textAlign="center"
					content={header}
					icon={icon}
					style={{fontFamily: 'Indie Flower, cursive', fontSize: '25px'}}
				/>
				<Divider />
				<Input
					name="label"
					placeholder="Add..."
					fluid
					action
					onChange={this.onChange}
					value={label}
				>
			    <input />
			    <Button
						color="green"
						icon="add circle"
						inverted
						content="Add"
						onClick={this.onAddItem}
						disabled={!label}
					/>
			  </Input>
				<List ordered size="huge">
					{map(items, item => (
						<List.Item key={item}>
							{item}&nbsp;&nbsp;
							<Icon name="delete" color="red" onClick={() => onRemoveItem(item)} />
						</List.Item>
					))}
				</List>
			</Segment>
		)
	}
}


RecipeAddSegment.propTypes = {
	onAddItem: PropTypes.func.isRequired,
	onRemoveItem: PropTypes.func.isRequired,
	header: PropTypes.string.isRequired,
	icon: PropTypes.string,
	items: PropTypes.arrayOf(PropTypes.string)
}


RecipeAddSegment.defaultProps = {
	items: []
}


export default RecipeAddSegment
