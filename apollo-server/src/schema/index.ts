export const typeDefs = `#graphql
  type Owner {
    login: String!
  }

  type Repository {
    id: String
    name: String
    size: Int
    owner: Owner
    default_branch: String
  }

  type RepoDetails {
    name: String
    size: Int
    owner: Owner
    private: Boolean
    numberOfFiles: Int
    ymlFileContent: String
    activeWebHooks: Int
  }

  type Query {
    repositories(directoryName: String, directory: String): [Repository],
    repositoryDetails(repoName: String, ownerName: String, ref: String): RepoDetails
  }
`;
