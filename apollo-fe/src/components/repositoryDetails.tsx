type RepositoryDetailsProps = {
  repositoryDetails: {
    name: string;
    size: string;
    owner: {
      login: string;
    };
    numberOfFiles: number;
    ymlFileContent: string;
    activeWebHooks: number;
    private: boolean;
  };
};

export const RepositoryDetails: React.FC<RepositoryDetailsProps> = (props) => {
  const { repositoryDetails } = props;

  return (
    <div className="repo-card">
      <h3>Repository name: {repositoryDetails.name}</h3>
      <p>Repo size: {repositoryDetails.size}</p>
      <p>Repo owner: {repositoryDetails.owner.login}</p>
      <p>Is private repo: {repositoryDetails.private ? 'true' : 'false'}</p>
      <p>Number of files in the repo: {repositoryDetails.numberOfFiles}</p>
      <p>
        Content of 1 yml file:{' '}
        {
          <pre className="file-content">
            {atob(repositoryDetails.ymlFileContent)}
          </pre>
        }
      </p>
      <p>Active webhooks: {repositoryDetails.activeWebHooks}</p>
    </div>
  );
};
