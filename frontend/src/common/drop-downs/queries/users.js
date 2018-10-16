import gql from 'graphql-tag'


export const QUERY = gql`
query userOptions ($username: String) {
  allUsers (username: $username, isActive: true, first: 15) {
    edges {
      node {
				id
				username
			}
    }
  }
}
`
