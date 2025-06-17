import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      id
      name
      description
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($updateCategoryInput: UpdateCategoryInput!) {
    updateCategory(updateCategoryInput: $updateCategoryInput) {
      id
      name
      description
    }
  }
`;

export const REMOVE_CATEGORY = gql`
  mutation RemoveCategory($id: Int!) {
    removeCategory(id: $id) {
      id
    }
  }
`;
