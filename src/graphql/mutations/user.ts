import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      firstName
      lastName
      email
      role
    }
  }
`;

export const UPDATE_USER_BY_ADMIN = gql`
  mutation UpdateUserByAdmin($updateUserInput: UpdateUserInput!) {
    updateUserByAdmin(updateUserInput: $updateUserInput) {
      id
      firstName
      lastName
      email
      role
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUserInput(updateUserInput: $updateUserInput) {
      id
      firstName
      lastName
      email
      role
      phoneNumber
    }
  }
`;
