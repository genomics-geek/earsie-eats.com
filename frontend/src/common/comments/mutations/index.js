import gql from 'graphql-tag'


export const USER_COMMENT_MUTATION = gql`
mutation manageUserComment(
  $text: String!,
  $id: String,
  $app: String,
  $model: String,
  $objectId: Int
) {
  manageUserComment(
    text: $text,
    id: $id,
    app: $app,
    model: $model,
    objectId: $objectId,
  ) {
    comment {
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
}
`


export const DELETE_USER_COMMENT_MUTATION = gql`
mutation deleteUserComment($id: String!) {
  deleteUserComment(id: $id) {
    comment {
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
}
`
