import gql from 'graphql-tag'


export const QUERY = gql`
query ingredientsOptions ($label: String) {
  allIngredients (label: $label) {
    edges {
      node {
				id
				label
			}
    }
  }
}
`
