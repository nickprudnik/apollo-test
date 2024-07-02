import { RESTDataSource } from '@apollo/datasource-rest';
import 'dotenv/config'
import { FileContext, Repository, Webhook } from '../types';

export class RepositoryAPI extends RESTDataSource {
  override baseURL = process.env.BASE_URL;

   willSendRequest(path, request) {
    request.headers['accept'] = 'application/vnd.github+json';
    request.headers['authorization'] = `Bearer ${process.env.DEV_TOKEN}`;
  }

  async getAllRepositories(orgName: string): Promise<Repository[]> {
    const data = await this.get(`orgs/${orgName}/repos`);
    return data;
  }

  async getRepository(orgName: string, repoName): Promise<Repository> {
    try {
      const [repository, repositoryWebhooks, fileContext, numberOfFiles] = await Promise.all([
        this.get<Repository>(`repos/${orgName}/${repoName}`),
        this.get<Webhook[]>(`/repos/${orgName}/${repoName}/hooks`),
        this.get<FileContext>(`/repos/${orgName}/${repoName}/contents/testdata/empty-cluster-kubeconfig.yaml`),
        this.get<FileContext[]>(`/repos/${orgName}/${repoName}/contents`),
      ]);
  
      repository.numberOfFiles = numberOfFiles.length;
      repository.ymlFileContent = fileContext.content;
      repository.activeWebHooks = repositoryWebhooks.length;
  
      return repository;
    } catch (error) {
      console.error('Error fetching repository data:', error);
      throw error;
    }
  }
  
};