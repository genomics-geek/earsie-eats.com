import React, { Component } from 'react'

import { Button, Grid, Header } from 'semantic-ui-react'

import RecipeDetailsForm from './components/presentational/recipe-details-form'
import CreateRecipe from './components/smart/create-recipe'


class CreateRecipeForm extends Component {
	initialState = {
		title: '',
		image: '',
		description: '',
		cookTime: '',
		prepTime: '',
		servingSize: '',
		active: false,
		ingredients: [],
		steps: [],
	}

	state = this.initialState

	onChange = (e, { name, value }) => this.setState({ [name]: value })

	onTextEdit = value => this.setState({ description: value })

	onImageSelect = input => this.fileUpload = input

	isDisabled = () => {
		const { title, description, cookTime, prepTime, servingSize } = this.state

		if (!title) return true
		else if (!description || description === '<p><br></p>') return true
		else if (!cookTime) return true
		else if (!prepTime) return true
		else if (!servingSize) return true
		else return false
	}

	render() {
		const { title, cookTime, prepTime, servingSize, image, description, active } = this.state

		return (
			<Grid padded>
				<Grid.Row style={{ paddingBottom: '0px' }}>
					<Grid.Column width={16}>
						<Header
							textAlign="center"
							content="Create a new Recipe!"
							style={{fontFamily: 'Indie Flower, cursive', fontSize: '55px'}}
						/>
						<CreateRecipe
							variables={{
								title,
								description,
								servingSize,
								prepTime,
								cookTime,
								active,
							}}
							onCompleted={() => this.setState(this.initialState)}
						>
							<Button
								icon="save"
								inverted
								color="green"
								size="large"
								content="Create Recipe!"
								disabled={this.isDisabled()}
							/>
						</CreateRecipe>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row>
					<Grid.Column width={8}>
						<RecipeDetailsForm
							onChange={this.onChange}
							onImageSelect={this.onImageSelect}
							onTextEdit={this.onTextEdit}
							title={title}
							image={image}
							description={description}
							servingSize={servingSize}
							prepTime={prepTime}
							cookTime={cookTime}
							active={active}
						/>
					</Grid.Column>

					<Grid.Column width={4}>
						Ingredients
					</Grid.Column>

					<Grid.Column width={4}>
						Steps
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}


export default CreateRecipeForm
