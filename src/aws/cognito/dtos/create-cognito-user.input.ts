export interface CreateCognitoUserInput {
  username: string;
  password?: string;
  options: {
    recreateIfExists?: boolean;
  };
}
