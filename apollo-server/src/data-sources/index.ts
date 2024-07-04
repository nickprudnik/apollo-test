import { RESTDataSource } from '@apollo/datasource-rest';
import 'dotenv/config';
import { FileContext, RepoTree, Repository, Webhook } from '../types';

export class RepositoryAPI extends RESTDataSource {
  override baseURL = process.env.BASE_URL;

  willSendRequest(path, request) {
    request.headers['accept'] = 'application/vnd.github+json';
    request.headers['authorization'] = `Bearer ${process.env.DEV_TOKEN}`;
  }

  async getAllRepositories(
    directoryName: string,
    directory: string
  ): Promise<Repository[]> {
    const isOrgDirectory = directory === 'org' ? true : false;
    const data = await this.get(
      `${isOrgDirectory ? 'orgs' : 'users'}/${directoryName}/repos${
        isOrgDirectory ? '' : '?sort=created&per_page=3'
      }`
    );
    return data;
  }

  async getRepository(
    repoName: string,
    ownerName: string,
    ref: string
  ): Promise<Repository> {
    try {
      const [repository, repositoryWebhooks, allFiles, numberOfFiles] =
        await Promise.all([
          this.get<Repository>(`/repos/${ownerName}/${repoName}`),
          this.get<Webhook[]>(`/repos/${ownerName}/${repoName}/hooks`),
          this.get<RepoTree>(
            `repos/${ownerName}/${repoName}/git/trees/${ref}?recursive=1`
          ),
          this.get<FileContext[]>(`/repos/${ownerName}/${repoName}/contents`),
        ]);

      const findedFileObject = allFiles.tree.find(
        (obj) =>
          obj.path.includes('yml') ||
          obj.path.includes('yaml') ||
          obj.path.includes('README.md')
      );
      const searchedFile = await this.get(
        `/repos/${ownerName}/${repoName}/git/blobs/${findedFileObject.sha}`
      );

      repository.numberOfFiles = numberOfFiles.length;
      repository.ymlFileContent = searchedFile.content;
      repository.activeWebHooks = repositoryWebhooks.length;

      return repository;
    } catch (error) {
      console.error('Error fetching repository data:', error);
      throw error;
    }
  }
}
