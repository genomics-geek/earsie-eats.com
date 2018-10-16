import React, { Component } from 'react'

import { concat, get, map, without } from 'lodash'
import PropTypes from 'prop-types'
import { withAlert } from 'react-alert'
import { withRouter } from 'react-router-dom'
import { Button, Grid } from 'semantic-ui-react'

import { api } from 'common/api'
import RecipeDetailsForm from './recipe-details-form'
import RecipeAddSegment from './recipe-add-segment'
import CreateOrEditRecipe from '../smart/create-or-edit-recipe'
import * as mutations from 'pages/recipes/mutations'


class RecipeForm extends Component {
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

	onEditIngredient = (label, index, newLabel) => {
		const { ingredients } = this.state
		const newIngredients = []

		map(ingredients, (item, number) => {
			if (number === index) newIngredients.push(newLabel)
			else newIngredients.push(item)
		})

		this.setState({ ingredients: newIngredients })
	}

	onRemoveIngredient = label => this.setState({ ingredients: without(this.state.ingredients, label) })

	onAddStep = label => this.setState({ steps: concat(this.state.steps, [label]) })

	onRemoveStep = label => this.setState({ steps: without(this.state.steps, label) })

	onEditStep = (label, index, newLabel) => {
		const { steps } = this.state
		const newSteps = []

		map(steps, (item, number) => {
			if (number === index) newSteps.push(newLabel)
			else newSteps.push(item)
		})

		this.setState({ steps: newSteps })
	}

	onChange = (e, { name, value }) => this.setState({ [name]: value })

	onImageSelect = input => this.fileUpload = input

	onTextEdit = value => this.setState({ description: value })

	onCompleted = data => {
		const { mode } = this.props
		const file = get(this.fileUpload, 'files[0]')

		if (file) {
			const { alert } = this.props

			let recipePK = get(data, 'createRecipe.recipe.pk')
			if (mode === 'edit') {
				recipePK = get(data, 'editRecipe.recipe.pk')
			}

			const form = new FormData()
			form.append('recipe', recipePK)
		  form.append('image', file)

	    api.put("/recipes/upload-image/", form, {
	      headers: {
	          'Content-Type': 'multipart/form-data',
	          'credentials': 'same-origin'
	        }
	    })
	    .then(response => alert.success('Image Added!'))
	    .catch(error => alert.error(error.message))
		}

		if (mode === 'add') {

			let recipeID = get(data, 'createRecipe.recipe.id')
			if (mode === 'edit') {
				recipeID = get(data, 'editRecipe.recipe.id')
			}

			const { history } = this.props
			history.push(`/management/recipes/edit/${recipeID}`)
		}
	}

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
		const { mode, recipeId } = this.props

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

		let mutation = mutations.CREATE_RECIPE_MUTATION
		if (mode === 'edit') mutation = mutations.EDIT_RECIPE_MUTATION

		return (
			<div className="Manage-Recipe">
				<Grid padded style={{ opacity: '0.90' }}>
					<Grid.Row style={{ paddingBottom: '0px' }}>
						<Grid.Column width={16}>
							<CreateOrEditRecipe
								mutation={mutation}
								variables={{
									id: recipeId,
									title,
									description,
									servingSize,
									prepTime,
									cookTime,
									steps,
									ingredients,
									active,
								}}
								onCompleted={this.onCompleted}
							>
								<Button
									icon="save"
									color="black"
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
								onEditItem={this.onEditIngredient}
								onRemoveItem={label => this.onRemoveIngredient(label)}
							/>
						</Grid.Column>

						<Grid.Column width={4}>
							<RecipeAddSegment
								icon="list"
								header="Steps"
								items={steps}
								onAddItem={this.onAddStep}
								onEditItem={this.onEditStep}
								onRemoveItem={label => this.onRemoveStep(label)}
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		)
	}
}


RecipeForm.propTypes = {
	mode: PropTypes.oneOf(['add', 'edit']).isRequired,
	history: PropTypes.object.isRequired,
	recipeId: PropTypes.string,
	defaultTitle: PropTypes.string,
	defaultImage: PropTypes.string,
	defaultDescription: PropTypes.string,
	defaultCookTime: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	defaultPrepTime: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	defaultServingSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	defaultActive: PropTypes.bool,
	defaultIngredients: PropTypes.arrayOf(PropTypes.string),
	defaultSteps: PropTypes.arrayOf(PropTypes.string),
}


RecipeForm.defaultProps = {
	recipeId: '',
	defaultTitle: '',
	defaultImage: '',
	defaultDescription: '',
	defaultCookTime: '',
	defaultPrepTime: '',
	defaultServingSize: '',
	defaultActive: true,
	defaultIngredients: [],
	defaultSteps: [],
}


export default withAlert(withRouter(RecipeForm))
