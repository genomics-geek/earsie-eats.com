import React, { Component } from 'react'

import { concat } from 'lodash'
import { Button, Grid, Header } from 'semantic-ui-react'

import RecipeDetailsForm from './components/presentational/recipe-details-form'
import RecipeAddSegment from './components/presentational/recipe-add-segment'
import CreateRecipe from './components/smart/create-recipe'

import './index.css'


class CreateRecipeForm extends Component {
	initialState = {
		title: '',
		image: '',
		description: '',
		cookTime: '',
		prepTime: '',
		servingSize: '',
		active: true,
		ingredients: [],
		steps: [],
	}

	state = this.initialState

	onAddIngredient = label => this.setState({ ingredients: concat(this.state.ingredients, [label]) })

	onAddSteps = label => this.setState({ steps: concat(this.state.steps, [label]) })

	onChange = (e, { name, value }) => this.setState({ [name]: value })

	onImageSelect = input => this.fileUpload = input

	onTextEdit = value => this.setState({ description: value })

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
		const {
			title,
			cookTime,
			prepTime,
			servingSize,
			image,
			description,
			active,
			ingredients,
			steps,
		} = this.state

		return (
			<div className="Create-Recipe">
				<Grid padded>
					<Grid.Row style={{ paddingBottom: '0px' }}>
						<Grid.Column width={16}>
							<Header
								textAlign="center"
								content="Create a new Recipe!"
								color="brown"
								style={{fontFamily: 'Indie Flower, cursive', fontSize: '55px'}}
							/>
							<CreateRecipe
								variables={{
									title,
									description,
									servingSize,
									prepTime,
									cookTime,
									steps,
									ingredients,
									active,
								}}
								onCompleted={() => this.setState(this.initialState)}
							>
								<Button
									icon="save"
									color="black"
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
							<RecipeAddSegment
								icon="food"
								header="Ingredients"
								items={ingredients}
								onAddItem={this.onAddIngredient}
							/>
						</Grid.Column>

						<Grid.Column width={4}>
							<RecipeAddSegment
								icon="list"
								header="Steps"
								items={steps}
								onAddItem={this.onAddSteps}
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		)
	}
}


export default CreateRecipeForm
