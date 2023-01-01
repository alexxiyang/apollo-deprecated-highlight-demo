import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { ApolloDeprecatedHighlight } from 'apollo-deprecated-highlight';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const typeDefs = `
  ${fs.readFileSync(path.resolve(__dirname, "schema.graphql").toString())}
`;

const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

const cars = [
    {
      make: 'Toyota',
      model: 'Camry',
    },
    {
      make: 'Honda',
      model: 'Accord',
    },
  ];

const resolvers = {
    Query: {
      books: () => books,
      cars: () => cars,
    },
  };

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloDeprecatedHighlight()]
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
  
console.log(`🚀  Server ready at: ${url}`);