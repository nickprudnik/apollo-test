import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

type RepositoryListingProps = {
  userData: {
    directory: string;
    directoryName: string;
  };
};

type RepositoryInfoProps = {
  id: string;
  name: string;
  size: number;
  owner: { login: string };
  default_branch: string;
};

const GET_REPOSITORIES = gql`
  query GetRepositoryDetails($directoryName: String!, $directory: String!) {
    repositories(directoryName: $directoryName, directory: $directory) {
      name
      id
      size
      owner {
        login
      }
      default_branch
    }
  }
`;

export const RepositoryListing: React.FC<RepositoryListingProps> = (props) => {
  const { userData } = props;

  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    variables: {
      directoryName: userData.directoryName,
      directory: userData.directory,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.repositories.map(
    ({ id, name, size, owner, default_branch }: RepositoryInfoProps) => (
      <Link
        to={`/details/${name}/?owner=${owner.login}&ref=${default_branch}`}
        key={id}
      >
        <div className="repo-card">
          <h3>Repository name: {name}</h3>
          <p>Repo size: {size}</p>
          <p>Repo owner: {owner.login}</p>
        </div>
      </Link>
    )
  );
};
