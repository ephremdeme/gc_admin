const { default: gql } = require("graphql-tag");
export const GET_USERS = gql`
  {
    users {
      id
      username
      phone
      status
    }
  }
`;
export const GET_SUSPENDED_USERS = gql`
  {
    getSuspendedUsers {
      id
      username
      phone
      status
    }
  }
`;

export const ADD_USER = gql`
  mutation createUser(
    $username: String!
    $phone: String!
    $password: String!
    $first_name: String!
    $last_name: String!
    $email: String!
  ) {
    createUser(
      phone: $phone
      username: $username
      password: $password
      first_name: $first_name
      last_name: $last_name
      email: $email
    ) {
      id
      token
      User {
        id
        username
        phone
        status
      }
    }
  }
`;

export const SUSPEND_USER = gql`
  mutation suspendUser($id: Int!) {
    suspendUser(id: $id) {
      id
      status
    }
  }
`;

export const UN_SUSPEND_USER = gql`
  mutation unSuspendUser($id: Int!) {
    unSuspendUser(id: $id) {
      id
      status
    }
  }
`;
export const DELETE_USER = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
