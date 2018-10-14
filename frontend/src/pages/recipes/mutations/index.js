import gql from 'graphql-tag'
import { Recipe } from '../fragments'


export const CREATE_RECIPE_MUTATION = gql`
mutation createRecipe(
	$title: String!,
  $description: String!,
  $cookTime: Float!,
  $prepTime: Float!
  $servingSize: Float!,
  $active: Boolean,
) {
  createRecipe(
  	title: $title,
    description: $description,
    cookTime: $cookTime,
    prepTime: $prepTime,
    servingSize: $servingSize,
    active: $active
  ) {
    recipe {...RecipeParts}
  }
}
${Recipe.fragments.default}
`
