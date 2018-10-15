import React, { Component } from 'react'

import { concat, without } from 'lodash'
import PropTypes from 'prop-types'
import { Button, Grid } from 'semantic-ui-react'

import RecipeDetailsForm from './recipe-details-form'
import RecipeAddSegment from './recipe-add-segment'
import CreateOrEditRecipe from '../smart/create-or-edit-recipe'


class EditRecipeForm extends Component {
	state = {
		prevRecipeID: this.props.recipeId,
		title: this.props.defaultTitle,
		image: this.props.defaultImage,
		description: this.props.defaultDescription,
		cookTime: this.props.defaultCookTime,
		prepTime: this.props.defaultPrepTime,
		servingSize: this.props.defaultServingSize,
		active: this.props.defaultActive,
		ingredients: this.props.defaultIngredients,
		steps: this.props.defaultSteps,
	}

	static getDerivedStateFromProps(props, state) {
    if (props.recipeId !== state.prevRecipeID) {
      return {
				prevRecipeID: props.recipeId,
				title: props.defaultTitle,
				image: props.defaultImage,
				description: props.defaultDescription,
				cookTime: props.defaultCookTime,
				prepTime: props.defaultPrepTime,
				servingSize: props.defaultServingSize,
				active: props.defaultActive,
				ingredients: props.defaultIngredients,
				steps: props.defaultSteps,
      }
    }
    return null
  }

	onAddIngredient = label => this.setState({ ingredients: concat(this.state.ingredients, [label]) })

	onRemoveIngredient = label => this.setState({ ingredients: without(this.state.ingredients, label) })

	onAddStep = label => this.setState({ steps: concat(this.state.steps, [label]) })

	onRemoveStep = label => this.setState({ steps: without(this.state.steps, label) })

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
							<CreateOrEditRecipe
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
							>
								<Button
									icon="save"
									color="blue"
									size="large"
									content="Save Recipe!"
									disabled={this.isDisabled()}
								/>
							</CreateOrEditRecipe>
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
								onRemoveItem={label => this.onRemoveIngredient(label)}
							/>
						</Grid.Column>

						<Grid.Column width={4}>
							<RecipeAddSegment
								icon="list"
								header="Steps"
								items={steps}
								onAddItem={this.onAddStep}
								onRemoveItem={label => this.onRemoveStep(label)}
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		)
	}
}


EditRecipeForm.propTypes = {
	recipeId: PropTypes.string,
	defaultTitle: PropTypes.string,
	defaultImage: PropTypes.string,
	defaultDescription: PropTypes.string,
	defaultCookTime: PropTypes.number,
	defaultPrepTime: PropTypes.number,
	defaultServingSize: PropTypes.number,
	defaultActive: PropTypes.bool,
	defaultIngredients: PropTypes.arrayOf(PropTypes.string),
	defaultSteps: PropTypes.arrayOf(PropTypes.string),
}


EditRecipeForm.defaultProps = {
	defaultActive: true,
	defaultSteps: [],
	defaultIngredients: [],
}


export default EditRecipeForm