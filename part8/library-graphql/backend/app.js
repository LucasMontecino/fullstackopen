const { GraphQLError } = require('graphql');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('./utils/config');

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      password: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });
        const books = await Book.find({
          author: author.id,
          genres: args.genre,
        }).populate('author', { name: 1, born: 1, bookCount: 1 });
        return books;
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author });
        const books = await Book.find({ author: author.id }).populate(
          'author',
          { name: 1, born: 1, bookCount: 1 }
        );
        return books;
      } else if (args.genre) {
        const books = await Book.find({ genres: args.genre }).populate(
          'author',
          { name: 1, born: 1, bookCount: 1 }
        );
        return books;
      } else {
        return await Book.find({}).populate('author', {
          name: 1,
          born: 1,
          bookCount: 1,
        });
      }
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      const findBooks = await Book.find({ author: root.id });
      return findBooks.length;
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      let findAuthor = await Author.findOne({ name: args.author });

      if (!findAuthor) {
        findAuthor = new Author({ name: args.author });

        try {
          await findAuthor.save();
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          });
        }
      }

      const book = new Book({
        ...args,
        author: findAuthor._id,
      });
      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: { ...args },
            error,
          },
        });
      }
      return book.populate('author', { name: 1, born: 1, bookCount: 1 });
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      const author = await Author.findOne({ name: args.name });
      if (!author)
        throw new GraphQLError('invalid author name', {
          extensions: { code: 'BAD_USER_INPUT' },
        });

      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError('Updating author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        });
      }
      return author;
    },

    createUser: async (root, { username, password, favoriteGenre }) => {
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({ username, passwordHash, favoriteGenre });
      try {
        await newUser.save();
      } catch (error) {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        });
      }
      return newUser;
    },

    login: async (root, { username, password }) => {
      const user = await User.findOne({ username });

      const passwordCompare =
        user === null
          ? false
          : await bcrypt.compare(password, user.passwordHash);

      if (!(user && passwordCompare)) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        id: user._id,
        username: user.username,
      };

      const token = jwt.sign(userForToken, SECRET_KEY, { expiresIn: 60 * 60 });

      return {
        value: token,
      };
    },
  },
};

module.exports = { typeDefs, resolvers };
