import gql from "graphql-tag";

export const GET_ALL_CATEGORIES = gql`
  {
    categories {
      id
      category
      SubCategory {
        id
        category
      }
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: Int!) {
    deleteCategory(id: $id) {
      id
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($id: Int!, $category: String!) {
    updateCategory(id: $id, category: $category) {
      id
      category
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation createCategory($category: String!) {
    createCategory(category: $category) {
      id
      category
    }
  }
`;
