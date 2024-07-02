import { useQuery, gql } from '@apollo/client';
import { Link } from "react-router-dom";

const GET_REPOSITORIES = gql`
  query GetRepositoryDetails($orgName: String!) {
    repositories(orgName: $orgName) {
      name
      id
      size
      owner {
        login
      }
    }
  }
`;

export const RepositoryListing = () => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    variables: { orgName: 'kcin-org' },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.repositories.map(
    ({
      id,
      name,
      size,
      owner,
    }: {
      id: string;
      name: string;
      size: number;
      owner: { login: string };
    }) => (
      <Link to={`details/${name}`} key={id}>
        <div className="repo-card">
        <h3>Repository name: {name}</h3>
          <p>Repo size: {size}</p>
          <p>Repo owner: {owner.login}</p>
        </div>
      </Link>
    )
  );
};