import gql from 'graphql-tag'


export const USER_ACTIVITY_MUTATION = gql`
mutation updateUserActivity(
  $app: String!,
  $model: String!,
  $objectId: Int!,
  $user: ID!,
  $activityType: String!
) {
  updateUserActivity(app: $app, model: $model, objectId: $objectId, user: $user, activityType: $activityType) {
    success
  }
}
`
