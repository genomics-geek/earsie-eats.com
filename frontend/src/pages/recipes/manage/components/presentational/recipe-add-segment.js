import React, { Component } from 'react'

import { map } from 'lodash'
import PropTypes from 'prop-types'
import { Button, Divider, Form, Header, Icon, List, Message, Segment } from 'semantic-ui-react'


class RecipeAddSegment extends Component {
	state = { label: '', activeLabel: '', editedLabel: '' }

	onChange = (e, {name, value}) => this.setState({ [name]: value })

	onAddItem = () => {
		const { onAddItem } = this.props
		const { label } = this.state

		this.setState({ label: '' })
		onAddItem(label)
	}

	onCancelEdit = () => this.setState({ activeLabel: '', editedLabel: '' })

	onEditItem = label => this.setState({ activeLabel: label })

	onEditLabel = (e, {value}) => this.setState({ editedLabel: value })

	onSaveEdit = (item, index) => {
		const { onEditItem } = this.props
		const { editedLabel } = this.state

		this.setState({activeLabel: '', editedLabel: ''})
		onEditItem(item, index, editedLabel)
	}

	render() {
		const { header, icon, items, onRemoveItem } = this.props
		const { label, activeLabel } = this.state

		return (
			<Segment>
				<Header
					textAlign="center"
					content={header}
					icon={icon}
					style={{fontFamily: 'Indie Flower, cursive', fontSize: '25px'}}
				/>
				<Divider />

				<Form error={items.includes(label)}>
					<Form.TextArea
						name="label"
						placeholder="Add..."
						onChange={this.onChange}
						rows={1}
						value={label}
					/>
					<Message error content="List can't contain duplicates!"/>
					<Button
						color="green"
						icon="add circle"
						inverted
						content="Add"
						onClick={this.onAddItem}
						disabled={!label || items.includes(label)}
					/>
				</Form>

				<List size="huge">
					{map(items, (item, index) => (
						<List.Item key={item}>
							{activeLabel === item ? (
								<Form>
									<Form.TextArea
										defaultValue={activeLabel}
										onChange={this.onEditLabel}
									/>
									<Button content="Cancel" onClick={this.onCancelEdit} />
									<Button color="green" content="Save" icon="save" onClick={() => this.onSaveEdit(item, index)} />
								</Form>
							) : (
								<React.Fragment>
									{item}&nbsp;&nbsp;
									<div style={{ display: 'inline-block' }}>
										<Icon name="edit" onClick={() => this.onEditItem(item)} />
										<Icon name="delete" color="red" onClick={() => onRemoveItem(item)} />
									</div>
								</React.Fragment>
							)}
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
	onEditItem: PropTypes.func.isRequired,
	header: PropTypes.string.isRequired,
	icon: PropTypes.string,
	items: PropTypes.arrayOf(PropTypes.string)
}


RecipeAddSegment.defaultProps = {
	items: []
}


export default RecipeAddSegment
