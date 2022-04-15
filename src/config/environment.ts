export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export const isEnvironment = (environment: Environment): boolean =>
  process.env.NODE_ENV === environment;

export const isProduction = (): boolean => {
  return isEnvironment(Environment.PRODUCTION);
};
