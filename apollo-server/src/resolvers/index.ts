export const resolvers = {
  Query: {
    repositories: async (_, { orgName }, { dataSources }) => {
      return dataSources.repositoryAPI.getAllRepositories(orgName);
    },
    repositoryDetails: async (_, { orgName, repoName }, { dataSources }) => {
      return dataSources.repositoryAPI.getRepository(orgName, repoName);
    }
  },
};