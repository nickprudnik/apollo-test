import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { RepositoryAPI } from './data-sources';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

interface ContextValue {
  dataSources: {
    repositoryAPI: RepositoryAPI;
  };
}

const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => {
    const { cache } = server;
    return {
      dataSources: {
        repositoryAPI: new RepositoryAPI({ cache }),
      },
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
