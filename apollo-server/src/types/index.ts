export type Repository = {
  name: string;
  size: number;
  owner: {
    login: string;
  };
  private: boolean;
  numberOfFiles: number;
  ymlFileContent: string;
  activeWebHooks: number;
};

export type Webhook = {
  type: string;
  id: number;
  name: string;
  active: boolean;
};

export type FileContext = {
  name: string;
  size: number;
  type: string;
  content: string;
  encoding: string;
};
