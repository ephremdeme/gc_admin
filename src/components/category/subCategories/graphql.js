import gql from "graphql-tag";

export const GET_CATEGORY = gql`
  query getCategory($id: Int!) {
    category(id: $id) {
      id
      category
      SubCategory {
        id
        category
      }
    }
  }
`;

export const DELETE_SUB_CATEGORY = gql`
  mutation deleteCategory($id: Int!) {
    deleteCategory(id: $id) {
      id
    }
  }
`;

export const UPDATE_SUB_CATEGORY = gql`
  mutation updateCategory($id: Int!, $category: String!) {
    updateCategory(id: $id, category: $category) {
      id
      category
    }
  }
`;

export const ADD_SUB_CATEGORY = gql`
  mutation createSubCategory($category: String!, $categoryId: Int!) {
    createSubCategory(category: $category, categoryId: $categoryId) {
      id
      category
    }
  }
`;
