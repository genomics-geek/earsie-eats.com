import gql from 'graphql-tag'


export const QUERY = gql`
query ingredientsOptions ($label: String) {
  allIngredients (label: $label, active: true, first: 15) {
    edges {
      node {
				id
				label
			}
    }
  }
}
`
