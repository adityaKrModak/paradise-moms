import { gql } from "@apollo/client";

export const ADD_ADDRESS = gql`
  mutation AddAddress($createAddressInput: CreateAddressInput!) {
    addAddress(createAddressInput: $createAddressInput) {
      id
      street
      city
      state
      zip
      country
    }
  }
`;

export const UPDATE_ADDRESS = gql`
  mutation UpdateAddress($updateAddressInput: UpdateAddressInput!) {
    updateAddress(updateAddressInput: $updateAddressInput) {
      id
      street
      city
      state
      zip
      country
    }
  }
`;
