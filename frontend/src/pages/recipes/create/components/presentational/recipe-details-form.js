import React, { Component } from 'react'

import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'
import { Checkbox, Header, Icon, Input, Label, Segment } from 'semantic-ui-react'


class RecipeDetailsForm extends Component {
	render() {
		const {
			onChange,
			onImageSelect,
			onTextEdit,
			title,
			image,
			description,
			servingSize,
			prepTime,
			cookTime,
			active
		} = this.props

		return (
			<Segment>

				<Header content="Title" />
				<Input
					name="title"
					fluid
					icon="newspaper"
					iconPosition="left"
					placeholder="Recipe title.."
					value={title}
					onChange={onChange}
				/>

				<Header content="Image" />
				<Label
					as="label"
					basic
					color="grey"
					size="large"
					htmlFor="upload"
					style={{ cursor: "pointer" }}
				>
					<Icon name="image outline" />
					Select File:
					<input
						hidden
						id="upload"
						type="file"
						ref={input => onImageSelect(input)}
						onChange={e => onChange(e, {name: 'image', value: e.target.value.split(/[\\/]/).pop()})}
					/>
				</Label>
				{image && <Label basic size="large" content={image} />}

				<Header content="Recipe Details"/>
				<Input
					name="servingSize"
					type="number"
					fluid
					placeholder="Serving size..."
					value={servingSize}
					onChange={onChange}
				/>
				<Input
					name="prepTime"
					type="number"
					fluid
					placeholder="Minutes to prep..."
					value={prepTime}
					onChange={onChange}
				/>
				<Input
					name="cookTime"
					type="number"
					fluid
					placeholder="Minutes to cook..."
					value={cookTime}
					onChange={onChange}
				/>

				<Header content="Description" />
				<ReactQuill
					className="Recipe-editor"
					value={description || ''}
					onChange={onTextEdit}
				/>

				<Header content="Publish?" />
				<Checkbox
					toggle
					checked={active}
					onChange={(e, {checked}) => onChange(e, { name: 'active', value: checked})}
				/>
			</Segment>
		)
	}
}


RecipeDetailsForm.propTypes = {
	onChange: PropTypes.func,
	onImageSelect: PropTypes.func,
	onTextEdit: PropTypes.func,
	title: PropTypes.string,
	image: PropTypes.string,
	description: PropTypes.string,
	active: PropTypes.bool,
}


export default RecipeDetailsForm
