import gql from 'graphql-tag'
import { Recipe } from '../fragments'


export const RECIPE_LIST_QUERY = gql`
query allRecipes(
  $id_In: String,
  $author: ID,
  $search: String,
  $authorIn: String,
  $totalTime: String,
  $ingredients: String
) {
  allRecipes(
    id_In: $id_In,
    author: $author,
    search: $search,
    authorIn: $authorIn,
    ingredients: $ingredients,
    totalTime: $totalTime,
    active: true,
    sortBy: "-published"
  ) {
		edges {
      node {
        ...RecipeParts
        totalComments
        totalDownVotes
        totalIngredients
        totalSteps
        totalUpVotes
      }
	  }
  }
  currentUser {
		id
    email
		username
    isStaff
	}
}
${Recipe.fragments.default}
`


export const RECIPE_DETAIL_QUERY = gql`
query recipe($id: ID!) {
  recipe(id: $id) {
    ...RecipeParts
    ingredients {
      edges {
        node {
          id
          label
        }
      }
    }
    steps {
      edges {
        node {
          id
          label
        }
      }
    }
  }
  currentUser {
		id
    email
		username
    isStaff
	}
}
${Recipe.fragments.default}
`
