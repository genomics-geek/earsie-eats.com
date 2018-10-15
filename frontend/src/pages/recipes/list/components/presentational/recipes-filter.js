import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { Button, Divider, Header, Form, Segment } from 'semantic-ui-react'

import { IngredientsDropdown, UsersDropdown } from 'common/drop-downs'


class RecipeFilter extends Component {
	state = JSON.parse(localStorage.getItem('recipeFilters')) || {search: "", ingredients: [], users: []}

	onChange = (e, {name, value}) => this.setState({ [name]: value })

	onSubmit = () => {
		const { refetch } = this.props
		const { search, ingredients, authors, totalTime } = this.state

		localStorage.setItem('recipeFilters', JSON.stringify(this.state))

		refetch({ search, ingredients: ingredients.join(), authorIn: authors.join(), totalTime })
	}

	render() {
		const { numberOfRecipes, loading } = this.props
		const { search, totalTime, authors, ingredients } = this.state

		return (
			<Segment loading={loading}>
				<Header content="Filter Recipes"/>
				<Form>
					<Form.Input
						fluid
						label="Search"
						name="search"
						placeholder="Search..."
						value={search}
						onChange={this.onChange}
					/>
					<Form.Input
						fluid
						label="Total Time (minutes) <="
						name="totalTime"
						placeholder="Minutes..."
						value={totalTime}
						type="number"
						onChange={this.onChange}
					/>
					<Form.Field>
						<label>Authors</label>
            <UsersDropdown
              name="authors"
              placeholder="Authors..."
              fluid
              search
              selection
              multiple
              selectOnBlur={false}
							value={authors}
							onChange={this.onChange}
            />
          </Form.Field>
					<Form.Field>
						<label>Ingredients</label>
            <IngredientsDropdown
              name="ingredients"
              placeholder="Ingredients..."
              fluid
              search
              selection
              multiple
              selectOnBlur={false}
							value={ingredients}
							onChange={this.onChange}
            />
          </Form.Field>
				</Form>
				<Divider />
				<Header>
					Total Recipes: {numberOfRecipes}
				</Header>
				<Button
					icon="filter"
					content="Filter"
					fluid
					primary
					onClick={this.onSubmit}
				/>
			</Segment>
		)
	}
}


RecipeFilter.propTypes = {
	refetch: PropTypes.func.isRequired,
	numberOfRecipes: PropTypes.number,
	loading: PropTypes.bool,
}


RecipeFilter.defaultProps = {
	numberOfRecipes: 0,
	loading: false,
}


export default RecipeFilter
