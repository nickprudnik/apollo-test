import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

const GET_REPOSITORY_DETAILS = gql`
  query GetRepositoryDetails($orgName: String!, $repoName: String!) {
    repositoryDetails(orgName: $orgName, repoName: $repoName) {
      name
      size
      owner {
        login
      }
      private
      numberOfFiles
      ymlFileContent
      activeWebHooks
    }
  }
`;

export const Details = () => {
  const { repoName } = useParams();

  const { loading, error, data } = useQuery(GET_REPOSITORY_DETAILS, {
    variables: { orgName: 'kcin-org', repoName },
  });

  return (
    <div className="container">
      {loading && <p>Loading...</p>}
      {error && <p>Error : {error.message}</p>}
      {data && data.repositoryDetails && !loading && !error ? (
        <div className="repo-card">
          <h3>Repository name: {data.repositoryDetails.name}</h3>
          <p>Repo size: {data.repositoryDetails.size}</p>
          <p>Repo owner: {data.repositoryDetails.owner.login}</p>
          <p>Is private repo: {data.repositoryDetails.private ? 'true' : 'false'}</p>
          <p>
            Number of files in the repo: {data.repositoryDetails.numberOfFiles}
          </p>
          <p>
            Content of 1 yml file:{' '}
            {
              <pre className="file-content">
                {atob(data.repositoryDetails.ymlFileContent)}
              </pre>
            }
          </p>
          <p>Active webhooks: {data.repositoryDetails.activeWebHooks}</p>
        </div>
      ) : null}
    </div>
  );
};
