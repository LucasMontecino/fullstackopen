import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query AllBooks {
    allBooks {
      id
      title
      author
      published
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation AddBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      author
      published
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;
