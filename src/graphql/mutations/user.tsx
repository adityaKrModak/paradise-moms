import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUserInput(updateUserInput: $updateUserInput) {
      id
      phoneNumber
    }
  }
`;
