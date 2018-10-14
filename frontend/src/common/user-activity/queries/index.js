import gql from 'graphql-tag'


export const ACTIVITY_COUNTS_QUERY = gql`
query activityCounts(
	$user: ID!,
	$app: String!,
	$model: String!,
	$objectId: Int!
) {
  activityCounts(
		user: $user,
		app: $app
		model: $model,
		objectId: $objectId,
	) {
    upVotes
    downVotes
    userUpVotes
    userDownVotes
  }
}
`
