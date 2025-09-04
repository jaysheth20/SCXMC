import { gql } from '@apollo/client';

export const SEARCH_BLOGS = gql`
  query SearchBlogs($searchText: String!) {
    search(
      where: {
        AND: [
          { name: "_templates", value: "{554AB7F8-6E55-47CA-A3C0-EF0DFA5C2257}", operator: EQ }
          { name: "_language", value: "en", operator: EQ }
          {
            OR: [
              { name: "Blog Title", value: $searchText, operator: CONTAINS }
              { name: "Blog Description", value: $searchText, operator: CONTAINS }
              { name: "Author", value: $searchText, operator: CONTAINS }
            ]
          }
        ]
      }
    ) {
      results {
        id
        name
        field(name: "Blog Title") {
          value
        }
        field(name: "Blog Description") {
          value
        }
        field(name: "Author") {
          value
        }
      }
    }
  }
`;
