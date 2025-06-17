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
      author {
        id
        name
      }
      published
      genres
    }
  }
`;

export const ALL_BOOKS_BY_GENRE = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      id
      title
      author {
        id
        name
      }
      published
      genres
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
      author {
        id
        name
      }
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

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      id
      username
      favoriteGenre
    }
  }
`;
