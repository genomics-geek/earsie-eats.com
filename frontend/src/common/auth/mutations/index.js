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


export const REGISTER_MUTATION = gql`
mutation login($input: RegisterInput!) {
  login(input: $input) @rest(
    method: "POST",
    endpoint: "auth",
    path: "registration/",
  ) {
    detail
  }
}
`


export const VERIFY_EMAIL_MUTATION = gql`
mutation login($input: VerifyEmailInput!) {
  login(input: $input) @rest(
    method: "POST",
    endpoint: "auth",
    path: "registration/verify-email/",
  ) {
    detail
  }
}
`
