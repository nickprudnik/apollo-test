import { useState, useEffect } from 'react';
import { RepositoryListing } from '../components/repositoryListing';
import { useSearchQuery } from '../hooks/useSearchQuery';

type FormTypes = {
  directory: string;
  directoryName: string;
};

export const Listing = () => {
  const query = useSearchQuery();
  const [userData, setUserData] = useState<FormTypes>({
    directory: '',
    directoryName: '',
  });

  useEffect(() => {
    if (query) {
      const directoryName = query.get('directoryName');
      const directory = query.get('directory');

      if (directoryName && directory) {
        setUserData({ directoryName, directory });
      }
    }
  }, [query]);

  return (
    <div className="container">
      <>
        <h2>{`My ${userData?.directory} repos 🚀`}</h2>
        <RepositoryListing userData={userData} />
      </>
    </div>
  );
};
