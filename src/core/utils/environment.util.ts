import { Environment } from '../enums/environment.enum';

export const isEnvironment = (environment: Environment): boolean =>
  process.env.NODE_ENV === environment;

export const isProduction = (): boolean => {
  return isEnvironment(Environment.Production);
};

export const isDevelopment = (): boolean => {
  return isEnvironment(Environment.Development);
};

export const isTest = (): boolean => {
  return isEnvironment(Environment.Test);
};
