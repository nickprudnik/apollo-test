import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useSearchQuery } from '../hooks/useSearchQuery';
import { RepositoryDetails } from '../components/repositoryDetails';

const GET_REPOSITORY_DETAILS = gql`
  query GetRepositoryDetails(
    $repoName: String!
    $ownerName: String!
    $ref: String!
  ) {
    repositoryDetails(
      repoName: $repoName
      ownerName: $ownerName
      ref: $ref
    ) {
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
  const query = useSearchQuery();

  const { loading, error, data } = useQuery(GET_REPOSITORY_DETAILS, {
    variables: {
      repoName,
      ownerName: query.get('owner'),
      ref: query.get('ref'),
    },
  });

  return (
    <div className="container">
      {loading && <p>Loading...</p>}
      {error && <p>Error : {error.message}</p>}
      {data && data.repositoryDetails && !loading && !error ? (
        <RepositoryDetails repositoryDetails={data.repositoryDetails} />
      ) : null}
    </div>
  );
};
