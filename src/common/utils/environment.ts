export enum Environment {
  Development = 'development',
  Production = 'production',
}

export const isEnvironment = (environment: Environment): boolean =>
  process.env.NODE_ENV === environment;

export const isProduction = (): boolean => {
  return isEnvironment(Environment.Production);
};
