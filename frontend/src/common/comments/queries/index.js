import gql from 'graphql-tag'


export const USER_COMMENTS_QUERY = gql`
query allUserComments(
	$app: String!,
	$model: String!,
	$objectId: Float!,
	$cursor: String
) {
  allUserComments(
		app: $app,
		model: $model,
		objectId: $objectId,
		active: true,
		sortBy: "-created",
		first: 15,
		after: $cursor
	) {
    edges {
      node {
        id
				text
				created
        user {
          id
					username
					email
					isStaff
        }
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
	currentUser {
		id
    email
		username
    isStaff
	}
}
`
