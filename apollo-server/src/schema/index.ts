export const typeDefs = `#graphql
  type Owner {
    login: String!
  }

  type Repository {
    id: String
    name: String
    size: Int
    owner: Owner
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
    repositories(orgName: String): [Repository],
    repositoryDetails(orgName: String, repoName: String): RepoDetails
  }
`;