import gql from 'graphql-tag'
import { Recipe } from '../fragments'


export const RECIPE_LIST_QUERY = gql`
query allRecipes($id_In: String!, $author: ID) {
  allRecipes(id_In: $id_In, author: $author, active: true) {
		edges {
      node {...ReceipeParts}
	  }
  }
}
${Recipe.fragments.default}
`


export const RECIPE_DETAIL_QUERY = gql`
query recipe($id: ID!) {
  recipe(id: $id) {
    ...ReceipeParts
  }
  currentUser {
		id
    email
		username
	}
}
${Recipe.fragments.default}
`
