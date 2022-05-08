import { App } from '../enums/app.enum';

export const appName = process.env.APP_NAME || undefined;
export const appGlobalPrefix = process.env.APP_GLOBAL_PREFIX || undefined;
export const isApp = (app: App): boolean => appName === app;
