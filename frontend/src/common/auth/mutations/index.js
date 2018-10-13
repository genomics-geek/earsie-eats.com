import gql from 'graphql-tag'


export const LOGIN_MUTATION = gql`
mutation login($input: LoginInput!) {
  login(input: $input) @rest(
    method: "POST",
    endpoint: "auth",
    path: "login/",
  ) {
    token
    user {
      pk
      username
    }
  }
}
`


export const LOGOUT_MUTATION = gql`
mutation login($input: LogoutInput!) {
  login(input: $input) @rest(
    method: "POST",
    endpoint: "auth",
    path: "logout/",
  ) {
    detail
  }
}
`
