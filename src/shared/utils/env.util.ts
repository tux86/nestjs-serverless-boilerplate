import { Env } from '../enums/env.enum';

export const isEnv = (environment: Env): boolean =>
  process.env.NODE_ENV === environment;

export const isProduction = (): boolean => {
  return isEnv(Env.Prod);
};

export const isDevelopment = (): boolean => {
  return isEnv(Env.Dev);
};

export const isTest = (): boolean => {
  return isEnv(Env.Test);
};
