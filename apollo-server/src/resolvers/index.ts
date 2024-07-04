export const resolvers = {
  Query: {
    repositories: async (_, { directoryName, directory }, { dataSources }) => {
      return dataSources.repositoryAPI.getAllRepositories(
        directoryName,
        directory
      );
    },
    repositoryDetails: async (
      _,
      { repoName, ownerName, ref },
      { dataSources }
    ) => {
      return dataSources.repositoryAPI.getRepository(repoName, ownerName, ref);
    },
  },
};
